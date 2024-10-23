from flask import Flask
from app.routes import assets_bp

app = Flask(__name__)

# Registrar el Blueprint de activos
app.register_blueprint(assets_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
