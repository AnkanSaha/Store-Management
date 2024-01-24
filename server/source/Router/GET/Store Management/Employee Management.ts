/* These lines of code are importing the necessary dependencies for the code to work properly. */
// import required dependency
import { Router, json } from 'express'; // import Router from express

import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // import AccountExistMiddleware

/* These lines of code are importing the `GetEmployee` function from the `Employee Management` module
in the `Controller/Store Management` directory. This function is used as the controller for the `GET
/get` route in the `EmployeeRouter`. */
// import controller
import { GetEmployee } from '../../../Service/Store Management/Employee Management'; // import GetEmployee controller

/* These lines of code are configuring the `EmployeeRouter` by creating a new instance of the `Router`
class from the `express` module and enabling CORS (Cross-Origin Resource Sharing) for all origins.
This allows the `EmployeeRouter` to handle HTTP requests and responses and to handle requests from
different domains or origins. */
// config router & cors
const EmployeeRouter = Router(); // Create EmployeeRouter

/* These lines of code are exporting the `EmployeeRouter` instance as the default export of the module.
This allows other modules to import and use the `EmployeeRouter` instance in their own code. The
`export default` syntax is used to specify the default export of the module, which in this case is
the `EmployeeRouter` instance. */
// export router
export default EmployeeRouter; // Export EmployeeRouter

/* This code is defining a route for the `EmployeeRouter` instance. Specifically, it is defining a
`GET` route with the path `/get` that will use the `json()` middleware and call the `GetEmployee`
function from the `Employee Management` module as the controller for this route. The `json()`
middleware is used to parse incoming request bodies in JSON format. */
// all routes
EmployeeRouter.get('/get', json(), AccountExistMiddleware, GetEmployee); // Get Employee Route
