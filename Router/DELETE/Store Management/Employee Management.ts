// Importing All Required Modules
import { Router, json } from 'express'; // Importing Express Router
import CORS from 'cors'; // Importing CORS

// Configuring Express Router
const Employee_Manage_Router = Router(); // Creating Router Object

// Configuring Express Router to use CORS
Employee_Manage_Router.use(CORS({ origin: '*' })); // Using CORS

// Importing Employee Management Controller

// Exporting Employee Management Router
export default Employee_Manage_Router;

// Creating Employee Management Router
Employee_Manage_Router.delete('/delete', json(), (req, res) => {
    // Employee Management Controller Logic
});
