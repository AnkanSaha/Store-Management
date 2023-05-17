/* This code is importing the `Router` class from the `express` module and creating a new instance of
the `Router` class called `PUT_REQUEST_Manager`. The `Router` class is used to create modular,
mountable route handlers for a web application. This instance can be used to define routes and
middleware specific to the PUT HTTP method. */
import { Router } from 'express'; // Importing express types & Router class
import { Failed_Response } from '../../helper/API Response'; // Importing the Failed_Response function

/* `const PUT_REQUEST_Manager = Router();` is creating a new instance of the `Router` class from the
`express` module and assigning it to a constant variable called `PUT_REQUEST_Manager`. This instance
can be used to define routes and middleware specific to the PUT HTTP method. */
const PUT_REQUEST_Manager = Router(); // Creating a new Router instance

/* This code is importing the `EmployeeRouterManagement` sub-router from the `./Store
Management/Employee Management` module and assigning it to a variable called
`EmployeeRouterManagement`. This sub-router can be used to define routes and middleware specific to
employee management functionality. The `// import all Sub-Routers` comment is simply indicating that
this is one of potentially multiple sub-routers being imported and linked to the main
`PUT_REQUEST_Manager` router. */
// import all Sub-Routers
import EmployeeRouterManagement from './Store Management/Employee Management'; // Importing Employee Management Router
/* This code is linking the `EmployeeRouterManagement` sub-router to the `PUT_REQUEST_Manager` main
router. It is specifying that any routes defined in the `EmployeeRouterManagement` sub-router should
be accessible under the `/employee` path when accessed through the `PUT_REQUEST_Manager` router.
This allows for modular and organized routing in the application. */
// linking all Sub-Routers to the main Router
PUT_REQUEST_Manager.use('/employee', EmployeeRouterManagement); // Linking Employee Management Router to the main Router


// global type declaration
type blank = void  // Creating a type alias for a number or undefined
type obj = object  // Creating a type alias for an object or undefined
type globe = any // Creating a type alias for a string, number, boolean, object, or undefined

// API Error Handling
PUT_REQUEST_Manager.put('*', (req: obj | globe, res: obj | globe) : blank => {
    Failed_Response({res:res, Status:"fail", Message:`Can't find ${req.originalUrl} on this server!`, Data:undefined}); // Sending a Failed Response to the client
}); // Catching all requests to undefined routes

/* `export default PUT_REQUEST_Manager;` is exporting the `PUT_REQUEST_Manager` instance of the
`Router` class as the default export of this module. This means that when another module imports
this module, they will receive the `PUT_REQUEST_Manager` instance as the default export, which they
can then use to define routes and middleware specific to the PUT HTTP method. */
export default PUT_REQUEST_Manager; // Exporting the Router instance
