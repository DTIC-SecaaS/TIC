from flask import Flask
from flask_cors import CORS
from app.routes import wapiti_bp
from app.tasks import celery
import os

app = Flask(__name__)
app_url = os.getenv('APP_URL')
CORS(app, resources={r"/api/*": {"origins": app_url}})

app.register_blueprint(wapiti_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004)
