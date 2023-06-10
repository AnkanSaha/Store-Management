/* These lines of code are importing the necessary dependencies for creating a router and enabling CORS
in an Express application. */
import { Router, json } from 'express'; // Importing express types & Router class
import CORS from 'cors'; // Importing CORS middleware
import { GeneralGlobalStringData } from '../../../config/App Config/General Config'; // Importing GeneralGlobalStringData constant

/* This code is configuring a router and enabling CORS (Cross-Origin Resource Sharing) middleware in an
Express application. */

// Config Router & CORS
const EmployeeRouterManagement = Router(); // Creating a new Router instance
EmployeeRouterManagement.use(CORS({
    origin:GeneralGlobalStringData.API_Allowed_URL
})); // Using CORS middleware

// Importing All Controllers
/* Importing the `UpdateEmployee` controller from the file located at `'../../../Controller/Store
Management/Employee Management'`. This controller is likely responsible for handling requests
related to updating employee information in the store management system. */
import { UpdateEmployee } from '../../../Service/Store Management/Employee Management'; // Importing UpdateEmployee controller

// Importing All Middlewares
import { CheckEmployeeUpdateMiddleware } from '../../../Middleware/Store Management/Employee management'; // Importing CheckEmployeeUpdateMiddleware middleware
/* This code is exporting the `EmployeeRouterManagement` router instance as the default export of the
module. This allows other modules to import and use the `EmployeeRouterManagement` router in their
own code. */
// Exporting EmployeeRouterManagement
export default EmployeeRouterManagement; // Exporting EmployeeRouterManagement

/* The comment `// All Routes that can handle requests` is indicating that the following code will
define all the routes that can handle requests in the Express application. */
// All Routes that can handle requests

/* The code is defining a route for updating an employee's information using the HTTP PUT method. The
route is `/update` and it is using the `json()` middleware to parse the request body. However, the
route handler function is missing and needs to be added to complete the route definition. */
EmployeeRouterManagement.put('/update', json(),CheckEmployeeUpdateMiddleware, UpdateEmployee); // Update Employee Route