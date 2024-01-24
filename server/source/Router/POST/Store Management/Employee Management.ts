/* These lines of code are importing the `Router` and `json` modules from the `express` package and the
`CORS` module from the `cors` package. The `Router` module is used to create modular, mountable
route handlers, while the `json` module is used to parse incoming request bodies in JSON format. The
`CORS` module is used to enable Cross-Origin Resource Sharing, which allows resources on a web page
to be requested from another domain outside the domain from which the resource originated. */
import { Router, json } from 'express'; // Importing Router from express

/* Importing the `CheckEmployeeAddMiddleware` function from the `Employee Management.ts` file located
in the `Middleware/Store Management/Employee management` directory. This middleware function is used
to check if the request to add a new employee has all the required fields and is valid before
passing it on to the `AddnewEmployee` controller function. */
// Importing Employee Middleware
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Path: Middleware/Store Management/Employee Management.ts

/* These lines of code are creating an instance of the `Router` module from the `express` package and
assigning it to a variable named `EmployeeRouterManagement`. This instance of `Router` is used to
create modular, mountable route handlers for the employee management functionality of the
application. */
// Creating an instance of Router
const EmployeeRouterManagement = Router(); // Creating an instance of Router

/* This line of code is importing the `AddnewEmployee` function from the `Employee Management.ts` file
located in the `Controller/Store Management/Employee Management` directory. This function is a
controller function that handles the logic for adding a new employee to the store management system.
It is used in the `EmployeeRouterManagement.post('/create', json(), CheckEmployeeAddMiddleware,
AddnewEmployee)` route handler to handle the POST request for creating a new employee. */
// import controller function
import { AddnewEmployee } from '../../../Service/Store Management/Employee Management'; // Path: Function/Account Management/Employee Management.ts

/* This line of code is creating a route handler for the `POST` request method at the endpoint
`/create` on the `EmployeeRouterManagement` instance of the `Router` module. The `json()` middleware
is being used to parse the incoming request body in JSON format. The `CheckEmployeeAddMiddleware`
middleware function is being used to check if the request to add a new employee has all the required
fields and is valid before passing it on to the `AddnewEmployee` controller function. The
`AddnewEmployee` function is a controller function that handles the logic for adding a new employee
to the store management system. */
// All Routes
EmployeeRouterManagement.post('/create', json(), AccountExistMiddleware, AddnewEmployee); // Creating an employee

/* The `export default` statement is used to export the `EmployeeRouterManagement` instance of the
`Router` module as a default export from the module. This allows other modules to import and use the
`EmployeeRouterManagement` instance by simply importing the module that exports it. */
// Exporting the Router
export default EmployeeRouterManagement;
