import { Router } from 'express'; // Importing express types & Router class

const DELETE_REQUEST_Manager = Router(); // Creating a new Router instance

// import all Sub-Routers
import Employee_Manage_Router from './Store Management/Employee Management'; // Importing Employee Management Router
// linking all Sub-Routers to the main Router
DELETE_REQUEST_Manager.use('/employee', Employee_Manage_Router); // Using Employee Management Router

export default DELETE_REQUEST_Manager; // Exporting the Router instance
