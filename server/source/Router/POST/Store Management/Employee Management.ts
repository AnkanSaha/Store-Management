import { Router, json } from 'express'; // Importing Router from express

// Importing Employee Middleware
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Path: Middleware/Store Management/Employee Management.ts

// Creating an instance of Router
const EmployeeRouterManagement = Router(); // Creating an instance of Router

// import controller function
import { AddnewEmployee } from '../../../Service/Store Management/Employee Management'; // Path: Function/Account Management/Employee Management.ts

// All Routes
EmployeeRouterManagement.post('/create', json(), AccountExistMiddleware, AddnewEmployee); // Creating an employee

// Exporting the Router
export default EmployeeRouterManagement;
