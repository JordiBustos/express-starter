# Express Starter Project

Welcome to the Express Starter Project! This project is designed to provide you with a solid foundation for building an Express.js site with pre-configured authentication/authorization processes, database models, and optional role-based access control.

This project follows the MVC pattern.

## Installation

To get started, follow these steps:

Clone this repository to your local machine:

```bash
git clone https://github.com/JordiBustos/node-starter.git
cd express-starter
docker-compose build
docker-compose up
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
```

## Contributing

If you encounter issues or have suggestions for improvement, feel free to open an issue or submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License.
