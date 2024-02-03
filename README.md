# Node Starter Project

Welcome to the Node Starter Project! This project is designed to provide you with a solid foundation for building an Express.js site with pre-configured authentication/authorization processes with JWT, database models, and role-based access control.

This project follows the MVC pattern, uses redis for caching/express-session storage, postgresql as database, bcrypt for hashing, jest for testing and socket.io.

## Installation

To get started, follow these steps:

Clone this repository to your local machine:

```bash
git clone https://github.com/JordiBustos/node-starter.git
cd node-starter
docker-compose build
docker-compose up
```

To run tests:

```bash
docker-compose -f docker-compose.dev.yml up
```

## Environment Variables

Before running the application, make sure to set the following environment variables in a .env file at the root of the project:

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
SESSION_SECRET=1234
ALLOWED_DOMAIN='http://localhost:3000'
NODE_ENV='development'
```

## Contributing

If you encounter issues or have suggestions for improvement, feel free to open an issue or submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License.
