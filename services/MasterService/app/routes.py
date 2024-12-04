from flask import Blueprint, jsonify, request
from app.tasks import perform_scan
from celery.result import AsyncResult

master_bp = Blueprint('master', __name__)

@master_bp.route('/master/scans', methods=['POST'])
def combined_scan():
    # Obtener datos del cuerpo de la solicitud (JSON)
    data = request.get_json()
    url = data.get('url')
    target = data.get('target')
    
    # Validar que al menos uno de los parámetros esté presente
    if not url and not target:
        return jsonify({'error': 'Both URL and target are required'}), 400

    task_id = None
    if url or target:
        # Iniciar tarea de escaneo en segundo plano
        task = perform_scan.apply_async(args=['wapiti', url]) if url else None
        task_id = task.id if task else None
        
        task = perform_scan.apply_async(args=['nmap', None, target]) if target else None
        task_id = task.id if task else task_id
        
        task = perform_scan.apply_async(args=['nikto', url]) if url else None
        task_id = task.id if task else task_id

    return jsonify({
        "message": "Escaneo iniciado en segundo plano",
        "task_id": task_id
    }), 202


@master_bp.route('/master/status/<task_id>', methods=['GET'])
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
    
# TODO: Revisar todo el micro de master, para que se le pase como parametros el servicio y el objetivo