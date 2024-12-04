# Usa una imagen de Python como base
FROM python:3.9

# Instalar Nikto desde GitHub
RUN git clone https://github.com/sullo/nikto.git /opt/nikto

# Crear un alias para ejecutar Nikto fácilmente
RUN ln -s /opt/nikto/program/nikto.pl /usr/local/bin/nikto

# Establece el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requerimientos e instalar las dependencias
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto 5000 para la aplicación Flask
EXPOSE 5005

# # Ejecutar la aplicación
CMD ["python", "app.py"]