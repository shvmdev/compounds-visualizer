Project Workflow Documentation
📌 Overview

This document outlines the workflow of the project, focusing on authentication, authorization, and API interactions related to compound management.

🔐 Authentication & Authorization

1️⃣ User Registration & Login

    Users can register and log in using their credentials.
    Passwords are securely hashed before storage.
    A JWT token is generated upon successful login.

2️⃣ Authorization

    Role-based access control (RBAC) is implemented.
    Users are assigned roles such as Admin, Editor, or Viewer.
    API access is restricted based on user roles.

🔄 API Workflow

1️⃣ Authentication APIs

    POST /auth/register → Registers a new user.
    POST /auth/login → Authenticates the user and issues a JWT token.

2️⃣ Compound Management APIs

    GET /compounds/ → Retrieves the list of compounds.
    PUT /compounds/:id → Updates a compound

⚙️ Workflow Explanation

1️⃣ User Authentication

    A user logs in using email and password.
    The server validates credentials and issues a JWT token.
    The token is included in subsequent API requests for authentication.

2️⃣ Authorization Process

    The JWT token is verified for each request.
    Based on the user’s role, access to certain APIs is granted or denied.

3️⃣ Compound Management Flow

    A logged-in user requests to fetch or modify compound data.
    The backend verifies authentication.
    If authorized, the requested operation is performed.

🔒 Security Measures

    JWT tokens are used for secure authentication.
    Passwords are stored using hashing techniques.
    API access restrictions ensure data protection.

🚀 Deployment Guide

This project supports Docker deployment using pre-built images stored in a .tar file. Follow the steps below to create, transfer, and deploy the application.

1️⃣ Create a .tar File of Docker Images

To export all required Docker images into a single .tar file, run:

docker save -o my_project.tar(tarname) compounds-visualizer-frontend:latest compounds-visualizer-backend:latest

This will save the images as my_project.tar.

2️⃣ Transfer the .tar File

Send my_project.tar to the target system using any method:

    Via SCP (for remote servers):

    scp my_project.tar user@remote-server:/path/to/destination

    Via USB, cloud storage, or file-sharing platforms

3️⃣ Load the Docker Images on the Target System

On the deployment server, load the images from the .tar file:

docker load -i my_project.tar

This will import the saved images into the local Docker registry.

4️⃣ Update docker-compose.yml

Before running docker-compose, update docker-compose.yml to use the loaded images instead of building from source.
Modify the docker-compose.yml file to replace build: with image:, like this:
Before (Using build)

services:
frontend:
build: ./frontend

After (Using image)

services:
frontend:
image: compounds-visualizer-frontend:latest

Repeat this for backend.

5️⃣ Start the Containers

Once the images are loaded and docker-compose.yml is updated, start the containers with:

docker-compose up -d

This will launch the frontend, backend, and database in detached mode (-d).

6️⃣ Verify Deployment

Check if the containers are running:

docker ps

You should see all services up and running.

📌 Notes

✅ No need to rebuild the images on the target system.
✅ Ensure docker-compose.yml references the correct image names.
✅ Use docker-compose down to stop the services when needed.

📢 Conclusion

This document provides a structured view of the authentication, authorization, and API interactions involved in the project, along with clear deployment steps using Docker. Let me know if further details are needed! 🚀
