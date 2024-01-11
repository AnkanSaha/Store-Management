/* These lines of code are importing essential modules required for creating an authentication router
in a Node.js application using the Express framework. */
// Import Essential Modules
import { Router, json } from 'express'; // import Router Module

/* Creating an instance of the Router module from the Express framework and assigning it to the
variable `Authenticate`. This instance can be used to define routes and handle requests for the
authentication functionality of the Node.js application. */
// Invoke Router
const Authenticate = Router(); // Create Router Instance

/* The code is importing two middleware functions named `SignUpValidation` and `LoginValidation` from
the file located at `'../../../Middleware/Auth/Account Validation'`. These middleware functions are
used to validate the input data for creating and logging into an account in the authentication
functionality of the Node.js application. */
// import All Middlewares
import {SignUpValidation, LoginValidation} from '../../../Middleware/Auth/Account Validation'; // Import SignUp Validation Middleware

/* The code is importing two functions named `CreateAccount` and `LoginAccount` from the file located
at `'../../../Controller/Auth/Auth Functions'`. These functions are used as controllers for handling
requests related to creating and logging into an account in the authentication functionality of the
Node.js application. */
// Import Controllers
import { CreateAccount, LoginAccount } from '../../../Service/Auth/Auth Functions'; // Import Create Account Function

/* These lines of code are defining two routes for the `Authenticate` router. The first route is for
creating a new account and the second route is for logging into an existing account. */
// All Routes that can handle requests
Authenticate.post('/CreateAccount', json(), SignUpValidation, CreateAccount); // Create Account Route

// login account Route

Authenticate.post('/login', json(), LoginValidation, LoginAccount); // Login Account Route

/* This code is exporting the `Authenticate` router instance as the default export of the module. This
allows other modules to import and use the `Authenticate` router in their own code. */

// export router
export default Authenticate; // Export Authenticate Router