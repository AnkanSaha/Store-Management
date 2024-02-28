// Import Essential Modules
import { Router, json } from 'express'; // import Router Module

// Invoke Router
const Authenticate = Router(); // Create Router Instance

// import All Middlewares
import { SignUpValidation, LoginValidation } from '../../../Middleware/Auth/Account Validation'; // Import SignUp Validation Middleware

// Import Controllers
import { CreateAccount, LoginAccount } from '../../../Service/Auth/Auth Functions'; // Import Create Account Function

// All Routes that can handle requests
Authenticate.post('/CreateAccount', json(), SignUpValidation, CreateAccount); // Create Account Route

// login account Route

Authenticate.post('/login', json(), LoginValidation, LoginAccount); // Login Account Route

// export router
export default Authenticate; // Export Authenticate Router
