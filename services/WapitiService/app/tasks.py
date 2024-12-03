from celery import Celery
import subprocess
from repository.repository import WapitiRepository
import os
import json
import glob
import datetime

wapiti_repository = WapitiRepository()

# Configuración de Celery
CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://redis:6379/0')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://redis:6379/0')

# Inicializar Celery
celery = Celery(
    'app',
    backend=CELERY_BROKER_URL,
    broker=CELERY_RESULT_BACKEND
)

@celery.task(name="tasks.perform_wapiti_scan", bind=True, queue="wapiti_queue")
def perform_wapiti_scan(self, url):
    try:
        base_filename = url.replace('https://', '').replace('http://', '').replace('/', '_')
        report_pattern = f"{base_filename}_*.json"

        # result = subprocess.run(
        #     ['wapiti', '-u', url, '-f', 'json', '-m', 'backup,blindsql,exec'],
        #     stdout=subprocess.PIPE,
        #     stderr=subprocess.PIPE,
        #     timeout=300
        # )
        result = subprocess.run(
            ['wapiti', '-u', url, '-f', 'json', '-m', 'backup,timesql,exec'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            stdin=subprocess.PIPE,  # Asegura que no esté esperando la entrada
            timeout=1000
        )


        if result.returncode != 0:
            return {"error": result.stderr.decode()}

        report_files = glob.glob(report_pattern)
        if not report_files:
            return {"error": f"Report file {report_pattern} not found"}

        report_filename = report_files[0]

        with open(report_filename, 'r') as file:
            parsed_output = json.load(file)

        wapiti_repository.save_scan_results({
            "target": url,
            "scan_results": parsed_output,
            "herramienta": "Wapiti",
            "fecha": datetime.datetime.now()
        })

        os.remove(report_filename)

        return {"message": "Scan report saved", "url": url}

    except subprocess.TimeoutExpired:
        return {"error": "Scan timed out"}
    except json.JSONDecodeError as json_err:
        return {"error": f"JSON decode error: {str(json_err)}"}
    except Exception as e:
        return {"error": str(e)}
