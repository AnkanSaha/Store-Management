/* This code is importing the `Router` class from the `express` module and creating a new instance of
the `Router` class called `DELETE_REQUEST_Manager`. The `Router` class is used to create modular,
mountable route handlers for a web application. */
import { Router } from 'express'; // Importing express types & Router class
import { Failed_Response } from '../../helper/API Response'; // Importing the Failed_Response function

const DELETE_REQUEST_Manager = Router(); // Creating a new Router instance

/* This code is importing a sub-router called `Employee_Manage_Router` from a file located at `'./Store
Management/Employee Management'`. The sub-router is then linked to the main router instance
`DELETE_REQUEST_Manager` using the `use()` method. This allows the sub-router to handle requests
that match the specified route path (`'/employee'`) and pass them on to the appropriate route
handler. */
// import all Sub-Routers
import Employee_Manage_Router from './Store Management/Employee Management'; // Importing Employee Management Router

/* This code is linking a sub-router called `Employee_Manage_Router` to the main router instance
`DELETE_REQUEST_Manager` using the `use()` method. It specifies that any requests that match the
route path `/employee` should be handled by the `Employee_Manage_Router` sub-router. This allows for
modular and organized handling of different routes and requests within the web application. */
// linking all Sub-Routers to the main Router
DELETE_REQUEST_Manager.use('/employee', Employee_Manage_Router); // Using Employee Management Router

// global type declaration
type blank = void  // Creating a type alias for a number or undefined
type obj = object  // Creating a type alias for an object or undefined
type globe = any // Creating a type alias for a string, number, boolean, object, or undefined

// API Error Handling
DELETE_REQUEST_Manager.delete('*', (req: obj | globe, res: obj | globe ) : blank => {
    Failed_Response({res:res, Status:"fail", Message:`Can't find ${req.originalUrl} on this server!`, Data:undefined}); // Sending a Failed Response to the client
}); // Catching all requests to undefined routes

/* This line of code is exporting the `DELETE_REQUEST_Manager` router instance as the default export of
the module. This allows other modules to import and use the `DELETE_REQUEST_Manager` router instance
in their own code. */
export default DELETE_REQUEST_Manager; // Exporting the Router instance
