// Importing All Required Modules
import { Router, json } from 'express'; // Importing Express Router

// Configuring Express Router
const EmployeeManageRouter = Router(); // Creating Router Object

// import controller Middleware
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Path: Middleware/Store Management/Employee Management.ts

// Importing Employee Management Controller
import { DeleteEmployee } from '../../../Service/Store Management/Employee Management'; // Path: Controller/Store Management/Employee Management.ts

// Exporting Employee Management Router
export default EmployeeManageRouter;

// Creating Employee Management Router
EmployeeManageRouter.delete('/delete', json(), AccountExistMiddleware, DeleteEmployee);
