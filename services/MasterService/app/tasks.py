import os
from celery import Celery
import requests
from config.config import get_database

# Configuración de Celery
CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://redis:6379/0')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://redis:6379/0')

# Inicializar Celery
celery = Celery(
    'app',
    backend=CELERY_BROKER_URL,
    broker=CELERY_RESULT_BACKEND
)


# Definir tareas Celery
@celery.task(name="tasks.perform_master_scan", bind=True, queue="master_queue")
def perform_scan(self, scan_type, url=None, target=None):
    try:
        db = get_database()
        collection = db['escaneos']
        
        scan_result = {}

        # Realizar la solicitud POST a los microservicios hijos
        if scan_type == 'wapiti' and url:
            response = requests.post(f'http://localhost:5000/api/wapiti/scans', json={'url': url})
            scan_result['wapiti_scan'] = response.json() if response.status_code == 200 else {'error': 'Wapiti scan failed'}
            collection.insert_one({"source": "Wapiti", "url": url, "scan_result": scan_result['wapiti_scan']})

        if scan_type == 'nmap' and target:
            response = requests.post(f'http://localhost:5000/api/nmap/scans', json={'target': target})
            scan_result['nmap_scan'] = response.json() if response.status_code == 200 else {'error': 'Nmap scan failed'}
            collection.insert_one({"source": "Nmap", "target": target, "scan_result": scan_result['nmap_scan']})

        if scan_type == 'nikto' and url:
            response = requests.post(f'http://localhost:5000/api/nikto/scans', json={'url': url})
            scan_result['nikto_scan'] = response.json() if response.status_code == 200 else {'error': 'Nikto scan failed'}
            collection.insert_one({"source": "Nikto", "url": url, "scan_result": scan_result['nikto_scan']})

        return scan_result
    except Exception as e:
        # Si ocurre un error, intentamos reintentar la tarea
        raise self.retry(exc=e)