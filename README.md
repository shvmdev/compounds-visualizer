**Project Workflow Documentation**

### Overview

This document outlines the workflow of the project, focusing on authentication, authorization, and API interactions related to compound management.

### **Authentication & Authorization**

1. **User Registration & Login**

   - Users can register and log in using their credentials.
   - Passwords are securely hashed before storage.
   - A JWT token is generated upon successful login.

2. **Authorization**
   - Role-based access control (RBAC) is implemented.
   - Users are assigned roles such as Admin, Editor, or Viewer.
   - Access to APIs is restricted based on user roles.

### **API Workflow**

1. **Authentication APIs**

   - `POST /auth/register` → Registers a new user.
   - `POST /auth/login` → Authenticates user and issues JWT token.

2. **Compound Management APIs**
   - `GET /compounds/` → Retrieves the list of compounds.
   - `PUT /api/compounds/:id` → Updates a compound (Admin/Editor only).

### **Workflow Explanation**

1. **User Authentication**

   - A user logs in using email and password.
   - The server validates credentials and issues a JWT token.
   - The token is included in subsequent API requests for authentication.

2. **Authorization Process**

   - The JWT token is verified for each request.
   - Based on the user’s role, access to certain APIs is allowed or denied.

3. **Compound Management Flow**
   - A logged-in user requests to fetch or modify compound data.
   - The backend verifies authentication and checks role-based access.
   - If authorized, the requested operation is performed.

### **Security Measures**

- JWT tokens are used for secure authentication.
- Passwords are stored using hashing techniques.

### **Deployement**

- The project supports Dockerization, but some fixes are still in progress.

### **Conclusion**

This document provides a structured view of the authentication, authorization, and API interactions involved in the project. Let me know if further details are needed!
