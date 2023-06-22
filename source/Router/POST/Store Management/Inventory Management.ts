/* These lines of code are importing necessary modules from the 'express' and 'cors' packages. */
import {Router, json} from 'express'; // Importing express types & Router class
import CORS from 'cors'; // Importing CORS middleware
import { GeneralGlobalStringData } from '../../../config/Keys/General Keys'; // Importing GeneralGlobalStringData for MongoDB URL

// import all Controllers
import { AddInventory } from '../../../Service/Store Management/Inventory Management'; // Importing AddInventory controller

/* These lines of code are configuring a new router instance called `InventoryRouterManagement` and
applying the CORS middleware to it. The `Router()` function is imported from the `express` package
and is used to create a new router instance. The `CORS()` function is imported from the `cors`
package and is used to apply the CORS middleware to the router instance. The `origin: '*'` option in
the CORS middleware allows requests from any origin. */
// Config Router & CORS
const InventoryRouterManagement = Router(); // Creating a new Router instance
InventoryRouterManagement.use(CORS({
    origin: GeneralGlobalStringData.API_Allowed_URL,
})); // Using CORS middleware


// import all Controllers Middleware
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Importing AddInventoryMiddleware middleware

/* These lines of code are exporting the `InventoryRouterManagement` router instance as the default
export of the module. This allows other modules to import and use the router instance by simply
importing the module that contains it. For example, another module could import this module and use
the `InventoryRouterManagement` router instance to handle requests by calling its methods such as
`post()` or `get()`. */
// export router
export default InventoryRouterManagement; // Exporting InventoryRouterManagement

/* These lines of code are defining a route for handling HTTP POST requests to add inventory data. */
// All Routes that can handle requests
InventoryRouterManagement.post('/add', json(), AccountExistMiddleware, AddInventory); // Add Inventory Route