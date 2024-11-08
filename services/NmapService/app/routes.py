from flask import Blueprint, jsonify
from repository.repository import NmapRepository
# import nmap
from app.tasks import perform_nmap_scan
from celery.result import AsyncResult

nmap_bp = Blueprint('nmap', __name__)

nmap_repository = NmapRepository()

@nmap_bp.route('/nmap/scans', methods=['GET'])
def get_scans():
    scans = nmap_repository.get_all_scans()
    if len(scans) == 0:
        return jsonify({'message': 'No existen escaneos', 'code': '204'}), 204
    return jsonify({'data': scans, 'code': '200'}), 200

@nmap_bp.route('/nmap/scans/<scan_id>', methods=['GET'])
def get_scan(scan_id):
    scan = nmap_repository.get_scan_by_id(scan_id)
    if scan:
        return jsonify({'data': scan, 'code':'200'}), 200
    return jsonify({'message': 'Escaneo no encontrado', 'code': '404'}), 404

@nmap_bp.route('/nmap/scans/<target>', methods=['POST'])
def scan(target):
    if not target:
        return jsonify({"error": "El parámetro 'target' es requerido"}), 400

    # Ejecutar el escaneo en segundo plano
    task = perform_nmap_scan.apply_async(args=[target])
    return jsonify({"message": "Escaneo iniciado en segundo plano", "task_id": task.id}), 202

@nmap_bp.route('/nmap/scans/status/<task_id>', methods=['GET'])
def get_task_status(task_id):
    task = AsyncResult(task_id)
    if task.state == 'PENDING':
        return jsonify({"status": "Pendiente"}), 200
    elif task.state == 'SUCCESS':
        return jsonify({"status": "Completado", "result": task.result}), 200
    else:
        return jsonify({"status": "Fallido", "error": task.info}), 500