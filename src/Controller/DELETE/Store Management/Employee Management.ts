// Importing All Required Modules
/* These lines of code are importing the necessary modules for creating an Express router and enabling
CORS (Cross-Origin Resource Sharing) functionality. */
import { Router, json } from 'express'; // Importing Express Router
import CORS from 'cors'; // Importing CORS

/* These lines of code are configuring an Express router by creating a new router object named
`Employee_Manage_Router` using the `Router()` method provided by the Express module. This router
object will be used to define the routes and middleware for handling HTTP requests and responses
related to employee management in a store management system. */
// Configuring Express Router
const Employee_Manage_Router = Router(); // Creating Router Object

/* This code is configuring the Express router to use CORS (Cross-Origin Resource Sharing)
functionality. The `CORS` module is imported and then used as middleware with the `use()` method of
the `Employee_Manage_Router` object. The `CORS()` function is passed an options object with the
`origin` property set to `'*'`, which allows requests from any origin. This enables the router to
handle requests from different domains or ports, which is necessary for web applications that need
to access resources from different sources. */
// Configuring Express Router to use CORS
Employee_Manage_Router.use(CORS({ origin: '*' })); // Using CORS

/* This line of code is importing a middleware function named `CheckEmployeeDeleteMiddleware` from a
file located at the path `'../../../Middleware/Store Management/Employee Management.ts'`. This
middleware function is used to check if the employee being deleted has any associated data or not,
and if so, it prevents the deletion of the employee. The middleware function is used in the
`Employee_Manage_Router` to handle the HTTP DELETE request for deleting an employee. */
// import controller Middleware
import { CheckEmployeeDeleteMiddleware } from '../../../Middleware/Store Management/Employee management'; // Path: Middleware/Store Management/Employee Management.ts

/* This line of code is importing a function named `DeleteEmployee` from a file located at the path
`'../../../Controller/Store Management/Employee Management.ts'`. This function is a controller
function that handles the HTTP DELETE request for deleting an employee in a store management system.
The function is used in the `Employee_Manage_Router` to handle the HTTP DELETE request for deleting
an employee. */
// Importing Employee Management Controller
import {DeleteEmployee}from '../../../Service/Store Management/Employee Management'; // Path: Controller/Store Management/Employee Management.ts

/* These lines of code are exporting the `Employee_Manage_Router` object as the default export of this
module. This allows other modules to import and use this router object in their own code by simply
importing the module that contains this code. The `export default` statement is used to specify the
default export of the module, which in this case is the `Employee_Manage_Router` object. */
// Exporting Employee Management Router
export default Employee_Manage_Router;

/* This line of code is defining a route for handling HTTP DELETE requests to delete an employee in a
store management system. The route is created using the `delete()` method of the
`Employee_Manage_Router` object, which is an instance of the Express router. The route is specified
as `'/delete'`, and it is configured to use the `json()` middleware function to parse the request
body as JSON. Additionally, two middleware functions are used to handle the request:
`CheckEmployeeDeleteMiddleware` and `DeleteEmployee`. `CheckEmployeeDeleteMiddleware` is used to
check if the employee being deleted has any associated data or not, and if so, it prevents the
deletion of the employee. `DeleteEmployee` is a controller function that handles the actual deletion
of the employee. */
// Creating Employee Management Router
Employee_Manage_Router.delete('/delete', json(),CheckEmployeeDeleteMiddleware, DeleteEmployee);
