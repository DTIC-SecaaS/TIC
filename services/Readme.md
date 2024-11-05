1.- Crear un entorno virtual
`python -m venv nombre_del_archivo`

2.- Activar el entorno virtual
`nombre_del_entorno\Scripts\activate`

3.- Instalar dependencias
`pip3 install -r requirements.txt`

# Configuracion de Docker

- crear una red de docker
  `docker network create nombre_red`

- ejecutar archivo docker-compose.yml
  `docker compose up ---build`

- para ejecutar solo un servicio del docker
  `docker-compose up nombre_servicio`

- para ejecutar el Dockerfile desde cero
  `docker compose build --no-cache nombre_servicio`

<!-- # configuracion BDD
username: MongoDB
password: admin -->
