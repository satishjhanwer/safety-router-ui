# Project Generation Prompt for Cursor IDE

## Project Overview

Generate a web application project using the following tech stack:

- **Frontend Framework**: React.js with Next.js
- **State Management**: Redux.js
- **Styling**: Tailwind CSS
- **Animations**: [Preferred animation library, e.g., Framer Motion or GSAP]
- **Database**: MongoDB for storing user data and prompt history
- **Authentication**: JWT-based authentication for secure, stateless session management
- **Accessibility and Responsiveness**: Ensure responsive design and accessibility for mobile and desktop.

## Folder Structure

1. **Root Level**
   - `pages`: Includes screens for user interaction and data flow.
     - **Login Screen** (`login.js`): User login integrated with JWT authentication.
     - **Home Page** (`index.js`): Landing page for AI safety content.
     - **User Landing Page** (`userLanding.js`): Prompt input, backend response handling, loading spinner, and probability matrix display.
   - `components`: Reusable UI elements (e.g., `Button`, `PromptInput`, `ResponseDisplay`, `Spinner`).
   - `redux`: Store configuration and slices for user state, prompt interactions, and API calls.
   - `animations`: Custom animations for loading and feedback.
   - `api`: Backend API setup with:
     - `auth.js`: JWT-based authentication (login, logout, token verification).
     - `analyzed.js`: Mock endpoint returning probability matrix (to be replaced with real logic).
   - `database`: MongoDB connection setup and schemas.
   - `utils`: Helper functions for token handling, API requests, and middleware.
   - `styles`: Tailwind CSS and global styling.

## MongoDB Schema Design

1. **User Schema**
   - **Purpose**: Store essential user data for authentication and session management.
   - **Schema**:
  
     ```javascript
     const UserSchema = new mongoose.Schema({
       username: { type: String, required: true, unique: true },
       passwordHash: { type: String, required: true }, // Store hashed password
       createdAt: { type: Date, default: Date.now },
       promptHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' }]
     });
     export default mongoose.model('User', UserSchema);
     ```

2. **Prompt Schema**
   - **Purpose**: Track prompt submissions, responses, and probability matrices for each user.
   - **Schema**:

     ```javascript
     const PromptSchema = new mongoose.Schema({
       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
       promptText: { type: String, required: true },
       responseMatrix: { type: Map, of: Number }, // Store probability matrix as key-value pairs
       createdAt: { type: Date, default: Date.now },
       selectedModel: { type: String, enum: ['ChatGPT', 'Claude', 'Gemini'], required: true }
     });
     export default mongoose.model('Prompt', PromptSchema);
     ```

## JWT Authentication Setup

1. **JWT Token Generation**
   - Upon successful login, generate a JWT token with the user’s ID and a custom expiration time.
   - **Token Generation Function**:

     ```javascript
     import jwt from 'jsonwebtoken';

     function generateToken(userId) {
       return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
     }
     ```

2. **Token Validation Middleware**
   - **Purpose**: Protect routes by verifying the token for user authentication.
   - **Middleware Implementation**:

     ```javascript
     import jwt from 'jsonwebtoken';

     function authenticateToken(req, res, next) {
       const token = req.headers['authorization'];
       if (!token) return res.status(401).send('Access Denied');

       jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if (err) return res.status(403).send('Invalid Token');
         req.userId = decoded.userId;
         next();
       });
     }
     ```

3. **JWT Secret Key Configuration**
   - Store the JWT secret in environment variables for security (`JWT_SECRET` in `.env` file).

4. **Environment Variables Setup**
   - Configure the following variables in a `.env` file:

     ```bash
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase
     JWT_SECRET=your_secret_key
     ```

## Enhanced Features and Functionalities

1. **User Authentication Flow**
   - **Login**: Validate user credentials and generate a JWT token upon successful login.
   - **Session Management**: Store JWT in `localStorage` or cookies; use token in headers for protected API requests.
   - **Logout**: Clear token from client storage and reset user state in Redux.

2. **Prompt Handling and API Flow**
   - **Submit Prompt**: Users enter prompts, which are sent to `analyzed` API endpoint.
   - **Probability Matrix Display**: Render the response matrix visually, with animations for loading and result display.
   - **Backend API with Mock Data**: For now, mock a response matrix; allow flexibility to replace this with actual backend logic in the future.

3. **Testing and Accessibility**
   - **Testing**: Include unit and integration tests, especially for JWT authentication, Redux store, and prompt submission flow.
   - **Accessibility**: Ensure ARIA labels, keyboard navigation, and responsive design for user-friendliness.

4. **API and Database Configurations**
   - **MongoDB Connection**: Set up MongoDB using the URI from the environment variable.
   - **JWT Secret Management**: Use the JWT secret from the environment variable for token encoding and decoding.

5. **Scripts and Configuration**
   - Add scripts in `package.json` for running the development server, connecting to MongoDB, and testing.
   - Implement `start`, `dev`, `test`, and `seed` scripts to seed initial user data into MongoDB.








Add proper authentication using JWT
Connect to your backend API
Add error handling
Implement the actual model routing logic
Add loading states and animations
Style everything according to your design system