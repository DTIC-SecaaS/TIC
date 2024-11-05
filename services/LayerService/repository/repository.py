from bson import ObjectId
from config.config import get_database
from models.model import LayerModel
from pymongo import errors

class LayerRepository:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db['layers']

    def get_all_layers(self):
        layers = list(self.collection.find())
        for layer in layers:
            layer['_id'] = str(layer['_id'])
        return layers

    def get_layer_by_id(self, layer_id):
        layer = self.collection.find_one({'_id': ObjectId(layer_id)})
        if layer:
            layer['_id'] = str(layer['_id'])
        return layer

    def create_layer(self, data):
        existing_layer = self.collection.find_one({'name': data['name']})
        if existing_layer:
            return None
        
        layer = LayerModel(
            name=data['name'],
            status=data['status']
        )
        result = self.collection.insert_one(layer.to_dict())
        return str(result.inserted_id)

    def update_layer(self, layer_id, data):
        updated_layer = self.collection.update_one(
            {'_id': ObjectId(layer_id)},
            {'$set': {
                'name': data['name'],
                'status': data['status']
            }}
        )
        return updated_layer.matched_count > 0

    def delete_layer(self, layer_id):
        result = self.collection.delete_one({'_id': ObjectId(layer_id)})
        return result.deleted_count > 0
