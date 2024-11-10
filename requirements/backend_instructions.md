# Project Overview

This file sets up the **backend** of a web application with the following technologies:

- **Database**: MongoDB for persistent user and prompt data storage.
- **Authentication**: JWT-based authentication to secure routes and manage user sessions.
- **API**: Node.js/Express endpoints to handle user authentication, prompt submission, and probability matrix responses.
- **Environment Configuration**: Use environment variables for secure storage of sensitive information like database URIs and JWT secrets.

# Feature Requirements

1. **Authentication (JWT)**:
   - Create a secure login API to authenticate users and generate a JWT token upon successful login.
   - Middleware to verify JWT tokens, restricting access to protected endpoints.
2. **User Schema (MongoDB)**:
   - Store user data, including `username`, `hashedPassword`, `createdAt`, and `promptHistory`.
3. **Prompt Schema (MongoDB)**:
   - Track prompt submissions with fields for `userId`, `promptText`, `responseMatrix`, `createdAt`, and `selectedModel`.
4. **API Endpoints**:
   - **POST `/login`**: Authenticates user credentials and returns a JWT token.
   - **GET `/user`**: Retrieves user details, protected by JWT verification.
   - **POST `/analyzed`**: Processes the user’s prompt and returns a mocked probability matrix for selecting an LLM model.
   - **Protected Routes**: Ensure all routes (besides login) are protected by JWT authentication.
5. **Session Security**: Ensure token-based session management, with the token stored securely in the frontend.

# Relevant Docs

- **MongoDB Documentation**: https://www.mongodb.com/docs
- **JWT Documentation**: https://jwt.io/introduction
- **Express Documentation**: https://expressjs.com/
- **Environment Variables**: Use `.env` to manage sensitive configurations.

# Current File Structure

(*Note*: Please copy and paste your current backend file structure here for reference.)
