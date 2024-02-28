/* These lines of code are importing the necessary dependencies for creating a router and enabling CORS
in an Express application. */
import { Router, json } from 'express'; // Importing express types & Router class

// Config Router & CORS
const EmployeeRouterManagement = Router(); // Creating a new Router instance

// Importing All Controllers
import { UpdateEmployee } from '../../../Service/Store Management/Employee Management'; // Importing UpdateEmployee controller

// Importing All Middlewares
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Importing CheckEmployeeUpdateMiddleware middleware

// Exporting EmployeeRouterManagement
export default EmployeeRouterManagement; // Exporting EmployeeRouterManagement

EmployeeRouterManagement.put('/update', json(), AccountExistMiddleware, UpdateEmployee); // Update Employee Route