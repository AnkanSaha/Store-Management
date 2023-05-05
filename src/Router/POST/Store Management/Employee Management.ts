import { Router, json } from 'express'; // Importing Router from express
import CORS from 'cors'; // Importing CORS from cors

// Importing Employee Middleware
import { CheckEmployeeAddMiddleware } from '../../../Middleware/Store Management/Employee management'; // Path: Middleware/Store Management/Employee Management.ts


//Creating an instance of Router
const EmployeeRouterManagement = Router(); // Creating an instance of Router

// Using CORS
EmployeeRouterManagement.use(CORS({ origin: '*' })); // Using CORS

//import controller function
import { AddnewEmployee } from '../../../Controller/Store Management/Employee Management'; // Path: Function/Account Management/Employee Management.ts


// All Routes
EmployeeRouterManagement.post('/create', json(), CheckEmployeeAddMiddleware, AddnewEmployee); // Creating an employee

//Exporting the Router
export default EmployeeRouterManagement;
