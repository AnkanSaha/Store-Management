import { Router, Request, Response } from 'express'; // Importing express types & Router class
import { Serve, StatusCodes } from 'outers'; // Import Failed_Response function
import { GeneralGlobalStringData } from '../config/Keys/General Keys'; // PORT from General Config

// Import Middlewares
import CORS from '../Middleware/Security/CORS'; // Importing CORS Middleware
import RateLimiter from '../Middleware/Security/RateLimiter'; // Importing RateLimiter Middleware
import { Middleware } from 'outers'; // Import StatusCodes from outers

// create a new Router instance
const RouterManager = Router(); // Creating a new Router instance

// Attach Security Middlewares
RouterManager.use(CORS); // Using CORS Config
RouterManager.use(RateLimiter); // Using RateLimiter Middleware
RouterManager.use(Middleware.MethodsController(['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])); // Only Allow GET, POST, PUT, DELETE, OPTIONS
RouterManager.use(Middleware.AccessController([new URL(GeneralGlobalStringData.API_Allowed_URL).hostname])); // Only Allow API_Allowed_URL
RouterManager.use(Middleware.RequestInjectIP(['POST', 'PUT', 'DELETE'])); // Injecting IP Address to the Request

// import all Sub-Routers
import POST_REQUEST_Manager from './POST/POST Request Manager'; // Importing the Sub-POST-Router
import GET_REQUEST_Manager from './GET/GET Request Manager'; // Importing the Sub-GET-Router
import PUT_REQUEST_Manager from './PUT/PUT Request Manager'; // Importing the Sub-PUT-Router
import DELETE_REQUEST_Manager from './DELETE/DELETE Request Manager'; // Importing the Sub-DELETE-Router

// linking all Sub-Routers to the main Router
RouterManager.use('/post', POST_REQUEST_Manager); // Linking the Sub-POST-Router to the main Router
RouterManager.use('/get', GET_REQUEST_Manager); // Linking the Sub-GET-Router to the main Router
RouterManager.use('/put', PUT_REQUEST_Manager); // Linking the Sub-PUT-Router to the main Router
RouterManager.use('/delete', DELETE_REQUEST_Manager); // Linking the Sub-DELETE-Router to the main Router

// If All Route are not found
RouterManager.all('*', (Request: Request, Response: Response): void => {
    Serve.JSON({
        response: Response,
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: `Can't find ${Request.originalUrl} on this server!`,
        data: undefined,
        Title: 'Route Not Found',
    }); // Sending a Failed Response to the client
}); // Catching all requests to undefined routes

// export the Router instance
export default RouterManager; // Exporting the Router instance
