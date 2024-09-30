# ToDo App

This project is a full-stack ToDo web application built using **Nuxt 3** for the frontend, **Node.js** with Express for the backend, and **MongoDB** for the database. The project is fully containerized using **Docker**.


### Backend (Todo-Api)
The backend is a RESTful API built using **Node.js** and **Express.js** that handles user authentication, task creation, updating, deletion, and retrieval. It uses **MongoDB** as the database and is containerized using Docker.

### Frontend (Todo-Web)
The frontend is built using **Nuxt 3** and **Pinia** for state management. It allows users to interact with the ToDo app, including registering, logging in, and managing tasks.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js (for local development if not using Docker).
- MongoDB (running inside Docker).

## Getting Started

### Cloning the Project

To clone the project from GitHub, run:

```bash
git clone https://github.com/febryansambuari/todo-app.git
cd todo-app
```

### Backend Setup (Todo-Api)
The backend (Todo-Api) is inside the Todo-Api directory. It uses MongoDB for data storage.
**Configuration**
- Copy .env.example to .env and update the environment variables:
```bash
cp Todo-Api/.env.example Todo-Api/.env
```
- Example .env file:
```bash
PORT=5000
MONGO_URI=mongodb://mongodb:27017/todo_db
JWT_SECRET=your_secret_key
```

### Frontend Setup (Todo-Web)
The frontend (Todo-Web) is located in the Todo-Web directory.
**Nuxt Configuration**
Make sure you configure the environment variables in the Todo-Web/.env file. Create the file if it does not exist:
```bash
cp Todo-Web/.env.example Todo-Web/.env
```
Update the variables in the .env file accordingly:
```bash
API_BASE_URL=http://localhost:5000/api
```

**Running the Project with Docker**
You can run both the frontend and backend using Docker Compose.
1. Ensure Docker is running.
2. In the root of the project directory (where the docker-compose.yml is located), run:
```bash
docker compose up --build
```

This will start the backend, frontend, and MongoDB services.

**Accessing the App**
- Backend (API): http://localhost:5000
- Frontend: http://localhost:3000

You can interact with the API using Postman or similar tools and view the frontend in a web browser.

**Stopping the Containers**
To stop the running containers, press Ctrl + C in the terminal and then run:
```bash
docker compose down
```

**API Endpoints (Backend)**
The following API endpoints are available in the backend:
- POST /api/users/login: User login
- POST /api/users/register: User registration
- GET /api/tasks: Retrieve all tasks
- POST /api/tasks: Create a new task
- PUT /api/tasks/: Update a task
- DELETE /api/tasks/: Delete a task

**Sample API Requests**
You can use the following sample requests to interact with the backend API:
- Login Request:
```bash
POST /api/users/login
Content-Type: application/json

{
    "username": "yourusername",
    "password": "yourpassword"
}
```
- Create a Task:
```bash
POST /api/tasks
Content-Type: application/json

{
    "title": "Sample Task",
    "description": "Task description"
}
```

## Development (without Docker)
If you want to run the frontend and backend without Docker, please follow these steps.
**Backend (Todo-Api)**
1. Navigate to the Todo-Api folder:
```bash
cd Todo-Api
```
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm run dev
```

**Frontend (Todo-Web)**
1. Navigate to the Todo-Web folder:
```bash
cd Todo-Web
```
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm run dev
```
**MongoDB**
Ensure MongoDB is running, either locally or in a Docker container. Update the MONGO_URI in the .env file accordingly.

**Future Improvements**
- Add user profile management.
- Implement task prioritization and filtering.
- Improve error handling and input validation.
- Bug fixing

**Contributing**
Feel free to submit issues, fork the repository, and create pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
