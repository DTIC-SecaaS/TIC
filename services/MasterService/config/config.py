import os
from pymongo import MongoClient

class Config:
    MONGO_URI = os.getenv("MONGO_URI")

def get_database():
    client = MongoClient(Config.MONGO_URI)
    return client["tic_db"]  # Nombre de la base de datos