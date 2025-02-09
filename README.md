# Dockerized Full-Stack Application

## Overview

This project is a **full-stack web application** that includes:

- **Frontend:** Angular (served using Nginx)
- **Backend:** Node.js + Express + Sequelize ORM
- **Database:** MySQL
- **Containerization:** Docker & Docker Compose

The entire application is containerized, making it easy to deploy, scale, and maintain.

---

## Features & Enhancements

✅ **Angular Frontend** served via **Nginx** for better performance.
✅ **Node.js Backend** with **ExpressJS & Sequelize ORM** to handle API requests efficiently.
✅ **MySQL Database** to store user information.
✅ **Dockerized** using **Docker & Docker Compose** for easy deployment.
✅ **Environment Variables** for configurable settings (DB credentials, ports, etc.).
✅ **Efficient Logging** to track application status and errors.
✅ **Secure Password Storage** using bcrypt for hashed passwords.
✅ **Error Handling** for better debugging and UX improvements.
✅ **Automated Builds & Deployment** using `docker-compose.yml`.

---

## Project Structure

```
/my-fullstack-app
│── /backend (Node.js + Express + Sequelize ORM)
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── /models
│   ├── /routes
│   ├── .env
│── /frontend (Angular)
│   ├── Dockerfile
│   ├── package.json
│   ├── src
│   ├── angular.json
│── /db (MySQL data storage)
│── docker-compose.yml
│── .dockerignore
│── .env
```

---

## Prerequisites

Make sure you have the following installed:

- **Docker**: [Download Docker](https://www.docker.com/get-started)
- **Docker Compose**: Included with Docker Desktop

---

## Installation & Running the Application

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/my-fullstack-app.git
cd my-fullstack-app
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```ini
DB_HOST=db
DB_USER=root
DB_PASSWORD=password
DB_NAME=mydatabase
```

### 3. Run the Application using Docker Compose

```bash
docker-compose up --build
```

This command will:

- Build and start the **Angular frontend**.
- Build and start the **Node.js backend**.
- Start the **MySQL database**.

---

## Docker Configuration

### **Backend Dockerfile** (`backend/Dockerfile`)

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### **Frontend Dockerfile** (`frontend/Dockerfile`)

```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### **Docker Compose Configuration** (`docker-compose.yml`)

```yaml
version: "3.8"
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "4200:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=password
      - DB_NAME=mydatabase

  db:
    image: mysql:latest
    container_name: mysql_container
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mydatabase
    ports:
      - "3306:3306"
    volumes:
      - ./db:/var/lib/mysql
```

---

## Verifying the Setup

After running `docker-compose up --build`, check if containers are running:

```bash
docker ps
```

You should see:

- **Frontend** running on `http://localhost:4200`
- **Backend** running on `http://localhost:5000`
- **Database** running on `port 3306`

---

## Stopping the Application

To stop and remove all containers:

```bash
docker-compose down
```

---

## Next Steps

- **Deploy to Cloud (AWS, GCP, Azure, etc.)**
- **Implement CI/CD for automatic builds and deployments**
- **Add User Authentication (JWT-based login system)**

---

## Conclusion 🎯

We successfully **Dockerized** our full-stack **Angular + Node.js + MySQL** application, making it **scalable, portable, and easy to deploy**. 🚀
