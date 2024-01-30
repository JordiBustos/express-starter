# Node Starter Project

Bienvenido al Node Starter Project! Este proyecto está diseñado para proporcionarte una base sólida para construir un sitio Express.js con procesos de autenticación/autorización preconfigurados, modelos de base de datos y control de acceso basado en roles opcional.

Este proyecto sigue el patrón MVC, utiliza redis para el almacenamiento en caché y postgresql como base de datos.

## Instalación

Para iniciar el proyecto, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/JordiBustos/node-starter.git
cd node-starter
docker-compose build
docker-compose up
```

## Variables de entorno

Antes de ejecutar el proyecto, asegúrate de configurar las variables de entorno en un archivo `.env` en la raíz del proyecto. Aquí tienes un ejemplo de cómo debería verse el archivo `.env`:

```bash
DB_USER='postgres'
DB_HOST='db'
DB_NAME='db_name'
DB_PASSWORD='password'
DB_PORT=5432
PORT=3000
JWT_SECRET=1234
REDIS_URL='redis://redis:6379'
REDIS_DATABASES=16
REDIS_PASSWORD='password'
REDIS_HOST=redis
REDIS_PORT=6379
```

## Contribuciones

Si encuentras problemas o tienes sugerencias para mejorar, no dudes en abrir un issue o enviar un pull request. ¡Las contribuciones son bienvenidas!

## Licencia

Este proyecto está licenciado bajo la licencia MIT.

### TODO

- Create email validation
- Implement permissions system based on role assigned to user
- UI as django admin?
