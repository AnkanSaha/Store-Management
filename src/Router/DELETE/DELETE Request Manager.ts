/* This code is importing the `Router` class from the `express` module and creating a new instance of
the `Router` class called `DELETE_REQUEST_Manager`. The `Router` class is used to create modular,
mountable route handlers for a web application. */
import { Router } from 'express'; // Importing express types & Router class

const DeleteRequestManager = Router(); // Creating a new Router instance

/* This code is importing a sub-router called `Employee_Manage_Router` from a file located at `'./Store
Management/Employee Management'`. The sub-router is then linked to the main router instance
`DELETE_REQUEST_Manager` using the `use()` method. This allows the sub-router to handle requests
that match the specified route path (`'/employee'`) and pass them on to the appropriate route
handler. */
// import all Sub-Routers
import Employee_Manage_Router from './Store Management/Employee Management'; // Importing Employee Management Router
import InventoryManagementRouter from './Store Management/Inventory Management'; // Importing Inventory Management Router
import CategoryManagementRouter from './Store Management/Category Management'; // Importing Category Management Router
import CustomerManagementRouter from './Store Management/Customer Management'; // Importing Customer Management Router

/* This code is linking a sub-router called `Employee_Manage_Router` to the main router instance
`DELETE_REQUEST_Manager` using the `use()` method. It specifies that any requests that match the
route path `/employee` should be handled by the `Employee_Manage_Router` sub-router. This allows for
modular and organized handling of different routes and requests within the web application. */
// linking all Sub-Routers to the main Router
DeleteRequestManager.use('/employee', Employee_Manage_Router); // Using Employee Management Router
DeleteRequestManager.use('/inventory', InventoryManagementRouter); // Using Employee Management Router
DeleteRequestManager.use('/category', CategoryManagementRouter); // Using Category Management Router
DeleteRequestManager.use('/customer', CustomerManagementRouter); // Using Customer Management Router

/* This line of code is exporting the `DELETE_REQUEST_Manager` router instance as the default export of
the module. This allows other modules to import and use the `DELETE_REQUEST_Manager` router instance
in their own code. */
export default DeleteRequestManager; // Exporting the Router instance
