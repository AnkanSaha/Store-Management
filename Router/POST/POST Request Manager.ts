import { Router } from 'express'; // Importing express types & Router class

const POST_REQUEST_Manager = Router(); // Creating a new Router instance

// import all Sub-Routers
import { Authenticate } from './Auth/Authentication'; // Importing Authentication Router

// linking all Sub-Routers to the main Router
POST_REQUEST_Manager.use('/auth', Authenticate); // Linking Authentication Router to the main Router

export default POST_REQUEST_Manager; // Exporting the Router instance