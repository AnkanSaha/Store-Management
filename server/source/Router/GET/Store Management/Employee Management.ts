// import required dependency
import { Router, json } from 'express'; // import Router from express

import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // import AccountExistMiddleware

// import controller
import { GetEmployee } from '../../../Service/Store Management/Employee Management'; // import GetEmployee controller

// config router & cors
const EmployeeRouter = Router(); // Create EmployeeRouter

// export router
export default EmployeeRouter; // Export EmployeeRouter

// all routes
EmployeeRouter.get('/get', json(), AccountExistMiddleware, GetEmployee); // Get Employee Route
