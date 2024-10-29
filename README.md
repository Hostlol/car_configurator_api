# Car Configuration API

### Overview
The Car Configuration API is a backend service that allows users to create, retrieve, and manage vehicle configurations. Built with Node.js and Express, this API provides a customizable experience for users to configure their dream car by choosing color, rim style, engine type, and additional specifications. Swagger documentation is integrated for easy exploration of available endpoints.

### Features
- **Create Vehicle Configurations**: Allows users to create custom configurations for vehicles, specifying attributes like color, rim type, engine, and more.
- **Retrieve Vehicles & Configurations**: Fetch all vehicle entries or configurations, with optional filtering and sorting capabilities.
- **Delete Configurations**: Remove specific configurations by ID.
- **Swagger Documentation**: Interactive API documentation for easy testing and exploration of endpoints.
- **MySQL Database Integration**: Persistent storage of vehicle details and configurations using MySQL.

### Technologies Used
- **Node.js & Express**: Fast and lightweight server framework for building RESTful APIs.
- **MySQL**: Relational database for storing vehicle and configuration data.
- **Swagger**: API documentation and testing interface.
- **Docker**: Containerization for easy deployment (if applicable).
- **Axios**: Frontend (or client-side) HTTP requests to interact with the API.

### API Endpoints
- **Vehicle Endpoints** (`/vehicles`)
  - `GET /vehicles`: Retrieve all vehicles with optional filters and sorting.
  - `POST /vehicles`: Create a new vehicle entry.
  - `GET /vehicles/{id}`: Retrieve a single vehicle by its ID.
  - `DELETE /vehicles/{id}`: Delete a specific vehicle by ID.

- **Configuration Endpoints** (`/configurations`)
  - `POST /configurations`: Create a new vehicle configuration.
  - `GET /configurations`: Retrieve all configurations with optional filters and sorting.
  - `DELETE /configurations/{id}`: Delete a specific configuration by ID.

### Project Structure
- **`src/config`**: Database configuration and setup.
- **`src/controllers`**: Logic for handling API requests.
- **`src/routes`**: Defines API routes for vehicles and configurations.
- **`swagger.js`**: Swagger setup for API documentation.

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/car-configuration-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd car-configuration-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the MySQL database and configure connection settings in `src/config/database.js`.
5. Start the server:
   ```bash
   npm start
   ```

### Usage
- Access Swagger API documentation at `http://localhost:3000/api-docs`.
- Use the documented endpoints to create and manage vehicle configurations.


