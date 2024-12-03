from bson import ObjectId
from config.config import get_database
from models.model import WapitiModel
from pymongo import errors

class WapitiRepository:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db['escaneos']
    
    def get_all_scans(self):
        scans = list(self.collection.find())
        for scan in scans:
            scan['_id'] = str(scan['_id'])
        return scans
    
    def get_scan_by_id(self, scan_id):
        scan = self.collection.find_one({'_id': ObjectId(scan_id)})
        if scan:
            scan['_id'] = str(scan['_id'])
        return scan
    
    def save_scan_results(self, data):
        scan = WapitiModel(
            target = data['target'],
            scan_results = data['scan_results'],
            herramienta = data['herramienta'],
            fecha = data['fecha']
        )
    
        try:
            result = self.collection.insert_one(scan.to_dict())
            return str(result.inserted_id)
        except errors.PyMongoError as e:
            print(f"Error al guardar los resultados del escaneo: {e}")
            return None