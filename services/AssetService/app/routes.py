from flask import Blueprint, request, jsonify
from repository.repository import AssetRepository

assets_bp = Blueprint('assets', __name__)

asset_repository = AssetRepository()

@assets_bp.route('/assets', methods=['GET'])
def get_assets():
    assets = asset_repository.get_all_assets()
    if len(assets) == 0:
        return jsonify({'message': 'No existen activos', 'code': '204'}), 204
    return jsonify({'data': assets, 'code': '200'}), 200

@assets_bp.route('/assets/<asset_id>', methods=['GET'])
def get_asset(asset_id):
    asset = asset_repository.get_asset_by_id(asset_id)
    if asset:
        return jsonify({'data': asset, 'code':'200'}), 200
    return jsonify({'message': 'Activo no encontrado', 'code': '404'}), 404

@assets_bp.route('/assets', methods=['POST'])
def create_asset():
    data = request.json
    
    asset_id = asset_repository.create_asset(data)
    if asset_id is None:
        return jsonify({"message": "El activo que intenta crear ya existe", 'code': '400'}), 400

    return jsonify({'data': {
        "asset_id": asset_id,
        "name": data['name'],
        "description": data['description'],
        "url_or_ip": data['url_or_ip'],
        "status": data['status']
    }, 'code': '201'}), 201

@assets_bp.route('/assets/<asset_id>', methods=['PUT'])
def update_asset(asset_id):
    data = request.get_json()
    updated = asset_repository.update_asset(asset_id, data)
    if updated:
        return jsonify({'message': 'Activo actualizado', 'code': '200'}), 200
    return jsonify({'message': 'Activo no encontrado', 'code': '404'}), 404

@assets_bp.route('/assets/<asset_id>', methods=['DELETE'])
def delete_asset(asset_id):
    deleted = asset_repository.delete_asset(asset_id)
    if deleted:
        return jsonify({'message': 'Activo eliminado', 'code': '200'}), 200
    return jsonify({'message': 'Activo no encontrado', 'code': '404'}), 404
