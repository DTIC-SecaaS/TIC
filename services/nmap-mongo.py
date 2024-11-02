from flask import Flask, request, jsonify
import nmap
from pymongo import MongoClient

# Crear una instancia de Flask
app = Flask(__name__)

# Conexión a MongoDB Atlas
client = MongoClient("mongodb+srv://andrescasagualpasalcedo:i9s8VrZRicoKhcFM@tesis.qgsff.mongodb.net/")
db = client['scan']  # Reemplaza con el nombre de tu base de datos
collection = db['scanResults']  # Reemplaza con el nombre de tu colección

@app.route('/scan', methods=['GET'])
def scan():
    # Obtener el objetivo del parámetro 'target' en la URL
    target = request.args.get('target')
    if not target:
        return jsonify({"error": "El parámetro 'target' es requerido"}), 400  # Devuelve error si no hay 'target'

    # Crear una instancia de Nmap PortScanner
    nm = nmap.PortScanner()

    # Argumentos para el escaneo con más detalles
    scan_args = "-sS -A -p- -T4 -Pn --script vuln"  # Incluye el script de vulnerabilidades

    # Realizar el escaneo
    try:
        nm.scan(hosts=target, arguments=scan_args, sudo=True)
    except nmap.PortScannerError as e:
        return jsonify({"error": str(e)}), 500  # Devuelve error si algo sale mal durante el escaneo

    # Estructurar los resultados para la respuesta JSON y MongoDB
    scan_results = []
    for host in nm.all_hosts():
        host_info = {
            "host": host,
            "state": nm[host].state(),
            "protocols": []
        }

        # Añadir información de protocolos y puertos
        for proto in nm[host].all_protocols():
            proto_info = {"protocol": proto, "ports": []}

            ports = nm[host][proto].keys()
            for port in sorted(ports):
                port_info = {
                    "port": port,
                    "state": nm[host][proto][port]["state"],
                    "service": nm[host][proto][port].get("name", "unknown"),
                    "version": nm[host][proto][port].get("version", "unknown"),
                    # Agregar la información de vulnerabilidades si existe
                    "vulnerabilities": nm[host][proto][port].get("script", {}),
                }
                proto_info["ports"].append(port_info)

            host_info["protocols"].append(proto_info)

        scan_results.append(host_info)

    # Guardar los resultados en MongoDB
    scan_entry = {
        "target": target,
        "scan_results": scan_results
    }
    collection.insert_one(scan_entry)  # Insertar el documento en la colección

    return jsonify({"message": "Escaneo guardado en MongoDB", "results": scan_results})  # Devuelve los resultados

# Iniciar el servidor Flask
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # Inicia el servidor Flask en el puerto 5000
