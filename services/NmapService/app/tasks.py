from celery import Celery
import nmap
from repository.repository import NmapRepository
import os
import datetime

nmap_repository = NmapRepository()

# Configuración de Celery
CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://redis:6379/0')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://redis:6379/0')

# Inicializar Celery
celery = Celery(
    'app',
    backend=CELERY_BROKER_URL,
    broker=CELERY_RESULT_BACKEND
)

@celery.task(name="tasks.perform_nmap_scan", bind=True, queue="nmap_queue")
def perform_nmap_scan(self, target):
    nm = nmap.PortScanner()
    scan_args = "-sS -A -p- -T4 -Pn --script vuln"
    try:
        nm.scan(hosts=target, arguments=scan_args)
    except nmap.PortScannerError as e:
        raise self.retry(countdown=5)

    scan_results = []
    for host in nm.all_hosts():
        host_info = {
            "host": host,
            "state": nm[host].state(),
            "protocols": []
        }
        for proto in nm[host].all_protocols():
            proto_info = {"protocol": proto, "ports": []}
            ports = nm[host][proto].keys()
            for port in sorted(ports):
                port_info = {
                    "port": port,
                    "state": nm[host][proto][port]["state"],
                    "service": nm[host][proto][port].get("name", "unknown"),
                    "version": nm[host][proto][port].get("version", "unknown"),
                    "vulnerabilities": nm[host][proto][port].get("script", {}),
                }
                proto_info["ports"].append(port_info)
            host_info["protocols"].append(proto_info)

        scan_results.append(host_info)

    # Guardar el resultado en MongoDB
    nmap_repository.save_scan_results({
        "target": target,
        "scan_results": scan_results,
        "herramienta": "Nmap",
        "fecha": datetime.datetime.now()
    })

    return {'result': scan_results}
