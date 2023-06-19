/* This code is importing the `Router` class from the `express` module and creating a new instance of
the `Router` class called `POST_REQUEST_Manager`. The `Router` class is used to create modular,
mountable route handlers for web applications. */
import { Router } from 'express'; // Importing express types & Router class

const PostRequestManager = Router(); // Creating a new Router instance

/* These lines of code are importing two sub-routers, `Authenticate` and `EmployeeRouterManagement`,
from separate files located in the `./Auth/Authentication` and `./Store Management/Employee
Management` directories, respectively. These sub-routers will be used to handle specific routes
within the main router (`POST_REQUEST_Manager`). The `use()` method is then used to link these
sub-routers to the main router, with a specified prefix for each sub-router's routes. */
// import all Sub-Routers
import  Authenticate from './Auth/Authentication'; // Importing Authentication Router
import EmployeeRouterManagement from './Store Management/Employee Management'; // Importing Employee Management Router
import InventoryRouterManagement from './Store Management/Inventory Management'; // Importing Inventory Management Router
import CategoryRouterManagement from './Store Management/Catagory Management'; // Importing Catagory Management Router
import OrderManagementRouter from './Store Management/Order Management'; // Importing Order Management Router

/* These lines of code are linking two sub-routers, `Authenticate` and `EmployeeRouterManagement`, to
the main router `POST_REQUEST_Manager`. The `use()` method is used to link these sub-routers to the
main router, with a specified prefix for each sub-router's routes. This means that any routes
defined in the sub-routers will be accessible through the main router with the specified prefix. For
example, any routes defined in the `Authenticate` sub-router will be accessible through the main
router with the prefix `/auth`, and any routes defined in the `EmployeeRouterManagement` sub-router
will be accessible through the main router with the prefix `/employee`. */

// linking all Sub-Routers to the main Router
PostRequestManager.use('/auth', Authenticate); // Linking Authentication Router to the main Router
PostRequestManager.use('/employee', EmployeeRouterManagement); // Linking Employee Management Router to the main Router
PostRequestManager.use('/inventory', InventoryRouterManagement); // Linking Employee Management Router to the main Router
PostRequestManager.use('/category', CategoryRouterManagement); // Linking Employee Management Router to the main Router
PostRequestManager.use('/order', OrderManagementRouter); // Linking Order Management Router to the main Router

/* `export default POST_REQUEST_Manager;` is exporting the `POST_REQUEST_Manager` router instance as
the default export of this module. This means that when another module imports this module, they can
access the `POST_REQUEST_Manager` router instance by simply importing this module without needing to
specify the name of the exported object. For example, another module could import this module like
this: `import router from './router';` and then use the `POST_REQUEST_Manager` router instance like
this: `router.get('/some-route', someHandlerFunction);`. */
export default PostRequestManager; // Exporting the Router instance
