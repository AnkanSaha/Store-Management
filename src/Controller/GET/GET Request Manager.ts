/* This code is importing the `Router` class from the `express` module and creating a new instance of
the `Router` class called `GET_REQUEST_Manager`. The `Router` class is used to create modular,
mountable route handlers for web applications. */
import { Router } from 'express'; // Importing express types & Router class

const GET_REQUEST_Manager = Router(); // Creating a new Router instance

/* This code is importing a sub-router called `EmployeeRouter` from the file located at `'./Store
Management/Employee Management'`. The sub-router is likely responsible for handling requests related
to employee management within a larger web application. */
// import all Sub-Routers
import EmployeeRouter from './Store Management/Employee Management'; // Import EmployeeRouter
import InventoryRouter from './Store Management/Inventory Management'; // Import InventoryRouter

/* This code is linking the `EmployeeRouter` sub-router to the `GET_REQUEST_Manager` main router. It is
specifying that any requests that start with the `/employee` path should be handled by the
`EmployeeRouter` sub-router. This allows for modular and organized handling of requests related to
employee management within a larger web application. */
// linking all Sub-Routers to the main Router
GET_REQUEST_Manager.use('/employee', EmployeeRouter); // Link EmployeeRouter to the main Router
GET_REQUEST_Manager.use('/inventory', InventoryRouter); // Link InventoryRouter to the main Router


/* This line of code is exporting the `GET_REQUEST_Manager` router instance as the default export of
the module. This means that when this module is imported into another module, the default export
will be the `GET_REQUEST_Manager` router instance, which can then be used to handle incoming
requests. */
export default GET_REQUEST_Manager; // Exporting the Router instance
