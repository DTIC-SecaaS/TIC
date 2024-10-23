from flask import Flask
from flask_cors import CORS
from app.routes import assets_bp
import os

app = Flask(__name__)
app_url = os.getenv('APP_URL')  # Accede a la variable APP_URL
CORS(app, resources={r"/api/*": {"origins": app_url}})

# Registrar el Blueprint de activos
app.register_blueprint(assets_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
