from flask import Flask, request, jsonify
from pymongo import MongoClient
import subprocess
import re

app = Flask(__name__)

# Conexión a MongoDB Atlas
client = MongoClient("mongodb+srv://andrescasagualpasalcedo:i9s8VrZRicoKhcFM@tesis.qgsff.mongodb.net/")
db = client['scan']  # Reemplaza con el nombre de tu base de datos
collection = db['scanResults']  # Reemplaza con el nombre de tu colección

def parse_nikto_output(output):
    parsed_result = {}
    lines = output.split('\n')

    current_section = None
    for line in lines:
        if line.startswith('+'):
            line = line[2:].strip()
            if ':' in line:
                key, value = map(str.strip, line.split(':', 1))
                if current_section:
                    if key in parsed_result[current_section]:
                        if isinstance(parsed_result[current_section][key], list):
                            parsed_result[current_section][key].append(value)
                        else:
                            parsed_result[current_section][key] = [parsed_result[current_section][key], value]
                    else:
                        parsed_result[current_section][key] = value
                else:
                    parsed_result[key] = value
            else:
                current_section = line
                parsed_result[current_section] = {}
        elif current_section:
            if 'details' in parsed_result[current_section]:
                parsed_result[current_section]['details'].append(line)
            else:
                parsed_result[current_section]['details'] = [line]

    return parsed_result

@app.route('/scan', methods=['GET'])
def start_scan():
    target_url = request.args.get('url')
    if not target_url:
        return jsonify({'error': 'URL is required'}), 400

    try:
        result = subprocess.run(['nikto', '-h', target_url], capture_output=True, text=True)
        output = result.stdout
        parsed_output = parse_nikto_output(output)
        
        # Almacena el resultado en MongoDB
        collection.insert_one({
            "url": target_url,
            "scan_result": parsed_output
        })
    except Exception as e:
        return jsonify({'error': 'An error occurred while running Nikto', 'details': str(e)}), 500

    return jsonify(parsed_output), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
