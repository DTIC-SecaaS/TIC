from flask import Blueprint, jsonify
from repository.repository import NiktoRepository
from app.tasks import perform_nikto_scan
from celery.result import AsyncResult

nikto_bp = Blueprint('nikto', __name__)

nikto_repository = NiktoRepository()

@nikto_bp.route('/nikto/scans', methods=['GET'])
def get_scans():
    """
    Obtiene todos los resultados de escaneos almacenados en la base de datos.
    """
    scans = nikto_repository.get_all_scans()
    if len(scans) == 0:
        return jsonify({'message': 'No existen escaneos', 'code': '204'}), 204
    return jsonify({'data': scans, 'code': '200'}), 200

@nikto_bp.route('/nikto/scans/<scan_id>', methods=['GET'])
def get_scan(scan_id):
    """
    Obtiene un escaneo específico por su ID.
    """
    scan = nikto_repository.get_scan_by_id(scan_id)
    if scan:
        return jsonify({'data': scan, 'code': '200'}), 200
    return jsonify({'message': 'Escaneo no encontrado', 'code': '404'}), 404

@nikto_bp.route('/nikto/scans/<path:target>', methods=['POST'])
def scan(target):
    """
    Inicia un escaneo Nikto para el objetivo especificado en segundo plano.
    """
    if not target:
        return jsonify({"error": "El parámetro 'target' es requerido"}), 400

    # Ejecutar el escaneo en segundo plano
    task = perform_nikto_scan.apply_async(args=[target])
    return jsonify({"message": "Escaneo iniciado en segundo plano", "task_id": task.id}), 202

@nikto_bp.route('/nikto/scans/status/<task_id>', methods=['GET'])
def get_task_status(task_id):
    """
    Obtiene el estado de una tarea de escaneo Nikto en segundo plano.
    """
    task = AsyncResult(task_id)
    if task.state == 'PENDING':
        return jsonify({"status": "Pendiente"}), 200
    elif task.state == 'SUCCESS':
        return jsonify({"status": "Completado", "result": task.result}), 200
    elif task.state == 'FAILURE':
        return jsonify({"status": "Fallido", "error": str(task.info)}), 500
    else:
        return jsonify({"status": task.state}), 200
