# Usar una imagen base de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requerimientos e instalar las dependencias
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]

# # Usar una imagen base de Python
# FROM python:3.9-slim

# # Establecer el directorio de trabajo
# WORKDIR /app

# # Copiar el archivo de requerimientos e instalar las dependencias
# COPY requirements.txt requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# # Copiar el script wait-for-it (asegúrate de tener este archivo localmente o usa ADD como lo tienes)
# # COPY wait-for-it.sh ./wait-for-it.sh
# # RUN chmod +x ./wait-for-it.sh

# # Copiar el resto del código de la aplicación
# COPY . .

# # Exponer el puerto en el que la aplicación se ejecutará
# EXPOSE 5000

# # Comando para ejecutar la aplicación, esperando a MongoDB
# # CMD ["./wait-for-it.sh", "mongodb:27017", "--", "python", "app.py"]
# CMD ["mongodb:27017", "--", "python", "app.py"]
