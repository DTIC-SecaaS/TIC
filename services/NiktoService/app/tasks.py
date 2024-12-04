from celery import Celery
import subprocess
from repository.repository import NiktoRepository
import os
import datetime

nikto_repository = NiktoRepository()

# Configuración de Celery
CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://redis:6379/0')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://redis:6379/0')

# Inicializar Celery
celery = Celery(
    'app',
    backend=CELERY_BROKER_URL,
    broker=CELERY_RESULT_BACKEND
)

def parse_nikto_output(output):
    """
    Procesa la salida del comando Nikto y la estructura en un formato manejable.

    Args:
        output (str): Salida del comando Nikto.

    Returns:
        dict: Resultado estructurado del escaneo.
    """
    parsed_result = {}
    lines = output.split('\n')

    current_section = None
    for line in lines:
        if line.startswith('+'):
            line = line[2:].strip()
            if ':' in line:
                key, value = map(str.strip, line.split(':', 1))
                if current_section:
                    if key in parsed_result[current_section]:
                        if isinstance(parsed_result[current_section][key], list):
                            parsed_result[current_section][key].append(value)
                        else:
                            parsed_result[current_section][key] = [parsed_result[current_section][key], value]
                    else:
                        parsed_result[current_section][key] = value
                else:
                    parsed_result[key] = value
            else:
                current_section = line
                parsed_result[current_section] = {}
        elif current_section:
            if 'details' in parsed_result[current_section]:
                parsed_result[current_section]['details'].append(line)
            else:
                parsed_result[current_section]['details'] = [line]

    return parsed_result

@celery.task(name="tasks.perform_nikto_scan", bind=True, queue="nikto_queue")
def perform_nikto_scan(self, target_url):
    """
    Ejecuta un escaneo con Nikto y almacena los resultados en MongoDB.

    Args:
        target_url (str): URL objetivo para el escaneo.

    Returns:
        dict: Resultado estructurado del escaneo.
    """
    try:
        # Ejecutar el comando Nikto
        result = subprocess.run(['nikto', '-h', target_url], capture_output=True, text=True)
        output = result.stdout

        # Procesar la salida de Nikto
        parsed_output = parse_nikto_output(output)

        # Guardar el resultado en MongoDB
        nikto_repository.save_scan_results({
            "target": target_url,
            "scan_results": parsed_output,
            "herramienta": "Nikto",
            "fecha": datetime.datetime.now()
        })

        return {'result': parsed_output}
    except subprocess.SubprocessError as e:
        raise self.retry(countdown=5, exc=e)
    except Exception as e:
        raise self.retry(countdown=10, exc=e)
