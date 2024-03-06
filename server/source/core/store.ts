// Import Express
import express, { Express } from 'express'; // Import express module

import { GeneralGlobalNumberData } from '../config/Keys/General Keys'; // PORT from General Config
import { FunctionBased } from 'outers'; // Import StatusCodes from outers

// Create Express Service Instance
const Service: Express = express(); // Create express app

// Import Routes Manager
import Router_Manager from '../Router/Router Manager'; // Import Router_Manager

// Import MongoDB Connect Function
import ConnectDB from '../config/Connection/MongoDB'; // Import MongoDB_Connect middleware

// Enable All Proxy Settings for Server Security
Service.set('trust proxy', () => true); // Enable All Proxy Settings

Service.use(express.static('public')); // Link public folder to the main app

// link all Middleware & Routes to the main app
Service.use('/api', Router_Manager); // Link Router_Manager to the main app

// Start server with Cluster Creator
FunctionBased.ClusterCreator(Service, GeneralGlobalNumberData.PORT, GeneralGlobalNumberData.CPU, [], [ConnectDB]); // Start Server with Cluster Creator
