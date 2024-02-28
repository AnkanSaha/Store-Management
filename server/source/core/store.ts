// Global Types
type obj = object; // Creating a type alias for an object or undefined
type globe = any; // Creating a type alias for a string, number, boolean, object, or undefined
type str = string; // Define a type for strings

// Import Express
import express, { Express } from 'express'; // Import express module

import { GeneralGlobalNumberData, GeneralGlobalStringData } from '../config/Keys/General Keys'; // PORT from General Config
import { StatusCodes, Middleware, methods, Console } from 'outers'; // Import StatusCodes from outers
import { Response } from '../helper/API Response'; // Import Failed_Response function
import RateLimiter from '../Middleware/Security/RateLimiter'; // RateLimiter Middleware

// Create Express Service Instance
const Service: Express = express(); // Create express app

// Import Routes Manager
import Router_Manager from '../Router/Router Manager'; // Import Router_Manager
import DB from '../config/Connection/MongoDB'; // Import MongoDB_Connect middleware

// Enable All Proxy Settings for Server Security
Service.set('trust proxy', () => true); // Enable All Proxy Settings

Service.use(express.static('public')); // Link public folder to the main app

// link all Middleware & Routes to the main app
Service.use(
    '/api',
    RateLimiter,
    Middleware.AccessController([new URL(GeneralGlobalStringData.API_Allowed_URL).hostname]),
    Router_Manager,
); // Link Router_Manager to the main app

// API Error Handling
type ErrorRequest = {
    originalUrl: str;
};

Service.all('*', (req: ErrorRequest, res: obj | globe): void => {
    Response({
        res,
        Status: 'fail',
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Message: `Can't find ${req.originalUrl} on this server!`,
        Data: undefined,
    }); // Sending a Failed Response to the client
}); // Catching all requests to undefined routes

// Database Connection Function
const ConnectDB = async () => {
    await DB();
    Console.green('Connected to MongoDB');
};

// Start server with Cluster Creator
methods.ClusterCreator(Service, GeneralGlobalNumberData.PORT, GeneralGlobalNumberData.CPU, [], [ConnectDB]); // Start Server with Cluster Creator
