from flask import Blueprint, jsonify
from repository.repository import WapitiRepository
from app.tasks import perform_wapiti_scan
from celery.result import AsyncResult

wapiti_bp = Blueprint('wapiti', __name__)

wapiti_repository = WapitiRepository()

@wapiti_bp.route('/wapiti/scans', methods=['GET'])
def get_scans():
    scans = wapiti_repository.get_all_scans()
    if len(scans) == 0:
        return jsonify({'message': 'No existen escaneos', 'code': '204'}), 204
    return jsonify({'data': scans, 'code': '200'}), 200

@wapiti_bp.route('/wapiti/scans/<scan_id>', methods=['GET'])
def get_scan(scan_id):
    scan = wapiti_repository.get_scan_by_id(scan_id)
    if scan:
        return jsonify({'data': scan, 'code':'200'}), 200
    return jsonify({'message': 'Escaneo no encontrado', 'code': '404'}), 404

@wapiti_bp.route('/wapiti/scans/<path:url>', methods=['POST'])
def scan(url):
    if not url:
        return jsonify({"error": "El parámetro 'url' es requerido"}), 400

    # Ejecutar el escaneo en segundo plano
    task = perform_wapiti_scan.apply_async(args=[url])
    return jsonify({"message": "Escaneo iniciado en segundo plano", "task_id": task.id}), 202

@wapiti_bp.route('/wapiti/scans/status/<task_id>', methods=['GET'])
def get_task_status(task_id):
    task = AsyncResult(task_id)
    if task.state == 'PENDING':
        return jsonify({"status": "Pendiente"}), 200
    elif task.state == 'SUCCESS':
        return jsonify({"status": "Completado", "result": task.result}), 200
    elif task.state == 'FAILURE':
        return jsonify({"status": "Fallido", "error": str(task.info)}), 500
    else:
        return jsonify({"status": task.state}), 200
