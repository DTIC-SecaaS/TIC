# Usa una imagen de Python como base
FROM python:3.9

# Instalar wapiti
RUN apt-get update && apt-get install -y wapiti

# Establece el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requerimientos e instalar las dependencias
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto 5000 para la aplicación Flask
EXPOSE 5004

# # Ejecutar la aplicación
# CMD ["python", "app.py"]
CMD ["celery", "-A", "app.tasks", "worker", "--loglevel=info", "--queues=wapiti_queue", "-n", "wapiti_worker"]