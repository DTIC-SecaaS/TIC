from bson import ObjectId
from config.config import get_database
from models.model import AssetModel
from pymongo import errors  # Importar errores de pymongo para manejar excepciones

class AssetRepository:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db['assets']

    def get_all_assets(self):
        assets = list(self.collection.find())
        for asset in assets:
            asset['_id'] = str(asset['_id'])
        return assets

    def get_asset_by_id(self, asset_id):
        asset = self.collection.find_one({'_id': ObjectId(asset_id)})
        if asset:
            asset['_id'] = str(asset['_id'])
        return asset

    def create_asset(self, data):
        # Check if Url already exists
        existing_asset = self.collection.find_one({'url_or_ip': data['url_or_ip']})
        if existing_asset:
            return None
        
        asset = AssetModel(
            name=data['name'],
            description=data['description'],
            url_or_ip=data['url_or_ip'],
            status=data['status']
        )
        result = self.collection.insert_one(asset.to_dict())
        return str(result.inserted_id)

    def update_asset(self, asset_id, data):
        updated_asset = self.collection.update_one(
            {'_id': ObjectId(asset_id)},
            {'$set': {
                'name': data['name'],
                'description': data['description'],
                'url_or_ip': data['url_or_ip'],
                'status': data['status']
            }}
        )
        return updated_asset.matched_count > 0

    def delete_asset(self, asset_id):
        result = self.collection.delete_one({'_id': ObjectId(asset_id)})
        return result.deleted_count > 0
