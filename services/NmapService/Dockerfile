# Usa una imagen de Python como base
FROM python:3.9

# Instalar nmap
RUN apt-get update && apt-get install -y nmap

# Establece el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requerimientos e instalar las dependencias
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto 5000 para la aplicación Flask
# EXPOSE 5003

# # Ejecutar la aplicación
# CMD ["python", "app.py"]
# Definir el comando por defecto para iniciar Celery (esto reemplaza el CMD para Flask)
# CMD ["celery", "-A", "app.celery", "worker", "--loglevel=info"]
CMD ["celery", "-A", "app.tasks", "worker", "--loglevel=info", "--queues=nmap_queue", "-n", "nmap_worker"]
