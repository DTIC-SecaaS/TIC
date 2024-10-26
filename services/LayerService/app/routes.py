from flask import Blueprint, request, jsonify
from repository.repository import LayerRepository

layers_bp = Blueprint('layers', __name__)

layer_repository = LayerRepository()

@layers_bp.route('/layers', methods=['GET'])
def get_layers():
    layers = layer_repository.get_all_layers()
    if len(layers) == 0:
        return jsonify({'message': 'No existen capas', 'code': '204'}), 204
    return jsonify({'data': layers, 'code': '200'}), 200

@layers_bp.route('/layers/<layer_id>', methods=['GET'])
def get_layer(layer_id):
    layer = layer_repository.get_layer_by_id(layer_id)
    if layer:
        return jsonify({'data': layer, 'code':'200'}), 200
    return jsonify({'message': 'Capa de red no encontrada', 'code': '404'}), 404

@layers_bp.route('/layers', methods=['POST'])
def create_layer():
    data = request.json
    
    layer_id = layer_repository.create_layer(data)
    if layer_id is None:
        return jsonify({"message": "La capa de red que intenta crear ya existe", 'code': '400'}), 400

    return jsonify({'data': {
        "layer_id": layer_id,
        "name": data['name'],
        # "description": data['description'],
        # "ip": data['ip'],
        "status": data['status']
    }, 'code': '201'}), 201

@layers_bp.route('/layers/<layer_id>', methods=['PUT'])
def update_layer(layer_id):
    data = request.get_json()
    updated = layer_repository.update_layer(layer_id, data)
    if updated:
        return jsonify({'message': 'Capa de red actualizada', 'code': '200'}), 200
    return jsonify({'message': 'Capa de red no encontrada', 'code': '404'}), 404

@layers_bp.route('/layers/<layer_id>', methods=['DELETE'])
def delete_layer(layer_id):
    deleted = layer_repository.delete_layer(layer_id)
    if deleted:
        return jsonify({'message': 'Capa de red eliminada', 'code': '200'}), 200
    return jsonify({'message': 'Capa de red no encontrada', 'code': '404'}), 404
