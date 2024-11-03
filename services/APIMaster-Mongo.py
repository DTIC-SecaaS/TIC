from flask import Flask, jsonify, request
import requests
from pymongo import MongoClient

app = Flask(__name__)

# Conexión a MongoDB Atlas
client = MongoClient("mongodb+srv://andrescasagualpasalcedo:i9s8VrZRicoKhcFM@tesis.qgsff.mongodb.net/")
db = client['scan']  # Reemplaza con el nombre de tu base de datos
collection = db['scanResults']  # Reemplaza con el nombre de tu colección

@app.route('/master/combined_scan', methods=['GET'])
def combined_scan():
    url = request.args.get('url')
    target = request.args.get('target')
    
    if not url or not target:
        return jsonify({'error': 'Both URL and target are required'}), 400

    combined_results = {}

    # Invocación de las APIs hijas según los parámetros
    try:
        if 'wapiti' in request.args:
            wapiti_response = requests.get(f'http://localhost:5002/scan', params={'url': url})
            wapiti_data = wapiti_response.json() if wapiti_response.status_code == 200 else {'error': 'Wapiti scan failed'}
            combined_results['wapiti_scan'] = wapiti_data

            # Almacena los resultados de Wapiti en MongoDB
            collection.insert_one({
                "source": "Wapiti",
                "url": url,
                "scan_result": wapiti_data
            })

        if 'nmap' in request.args:
            nmap_response = requests.get(f'http://localhost:5000/scan', params={'target': target})
            nmap_data = nmap_response.json() if nmap_response.status_code == 200 else {'error': 'Nmap scan failed'}
            combined_results['nmap_scan'] = nmap_data

            # Almacena los resultados de Nmap en MongoDB
            collection.insert_one({
                "source": "Nmap",
                "target": target,
                "scan_result": nmap_data
            })

        if 'nikto' in request.args:
            nikto_response = requests.get(f'http://localhost:5001/scan', params={'url': url})
            nikto_data = nikto_response.json() if nikto_response.status_code == 200 else {'error': 'Nikto scan failed'}
            combined_results['nikto_scan'] = nikto_data

            # Almacena los resultados de Nikto en MongoDB
            collection.insert_one({
                "source": "Nikto",
                "url": url,
                "scan_result": nikto_data
            })

        return jsonify(combined_results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5003, debug=True)  # API maestra en el puerto 5003
