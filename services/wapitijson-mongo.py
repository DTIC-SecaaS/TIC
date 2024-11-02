from flask import Flask, request, jsonify
from pymongo import MongoClient
import subprocess
import json
import os
import glob

# Crear el objeto Flask
app = Flask(__name__)

# Conexión a MongoDB Atlas
client = MongoClient("mongodb+srv://andrescasagualpasalcedo:i9s8VrZRicoKhcFM@tesis.qgsff.mongodb.net/")
db = client['scan']  # Reemplaza con el nombre de tu base de datos
collection = db['scanResults']  # Reemplaza con el nombre de tu colección

@app.route('/scan', methods=['GET'])
def scan():
    try:
        url = request.args.get('url')
        if not url:
            return jsonify({'error': 'No URL provided'}), 400

        # Define un patrón de archivo basado en la URL
        base_filename = url.replace('https://', '').replace('http://', '').replace('/', '_')
        report_pattern = f"{base_filename}_*.json"

        # Ejecutar Wapiti con módulos seleccionados y generar el reporte
        result = subprocess.run(
            ['wapiti', '-u', url, '-f', 'json', '-m', 'backup,blindsql,exec'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=300  # Timeout de 5 minutos
        )

        if result.returncode != 0:
            return jsonify({'error': result.stderr.decode()}), 500

        # Buscar el archivo JSON generado usando el patrón
        report_files = glob.glob(report_pattern)
        if not report_files:
            return jsonify({'error': f"Report file {report_pattern} not found"}), 500

        # Utilizar el primer archivo que coincida con el patrón
        report_filename = report_files[0]

        # Lee el contenido del archivo JSON
        with open(report_filename, 'r') as file:
            parsed_output = json.load(file)

        # Guardar el resultado completo del escaneo en MongoDB
        collection.insert_one({
            "url": url,
            "scan_result": parsed_output  # Guardar el JSON completo
        })

        # Elimina el archivo después de leerlo (opcional)
        os.remove(report_filename)

        return jsonify({'message': 'Scan report saved in MongoDB', 'url': url})
    except subprocess.TimeoutExpired:
        return jsonify({'error': 'Scan timed out'}), 500
    except json.JSONDecodeError as json_err:
        return jsonify({'error': f'JSON decode error: {str(json_err)}'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
