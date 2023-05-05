import { Router } from 'express'; // Importing express types & Router class

const GET_REQUEST_Manager = Router(); // Creating a new Router instance

// import all Sub-Routers
import EmployeeRouter from './Store Management/Employee Management'; // Import EmployeeRouter

// linking all Sub-Routers to the main Router
GET_REQUEST_Manager.use('/employee', EmployeeRouter); // Link EmployeeRouter to the main Router

export default GET_REQUEST_Manager; // Exporting the Router instance
