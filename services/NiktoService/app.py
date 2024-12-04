from flask import Flask
from flask_cors import CORS
from app.routes import nikto_bp
import os

app = Flask(__name__)
app_url = os.getenv('APP_URL')
CORS(app, resources={r"/api/*": {"origins": app_url}})

app.register_blueprint(nikto_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005)
