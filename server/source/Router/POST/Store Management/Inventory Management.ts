/* These lines of code are importing necessary modules from the 'express' and 'cors' packages. */
import {Router, json} from 'express'; // Importing express types & Router class
// import all Controllers
import { AddInventory } from '../../../Service/Store Management/Inventory Management'; // Importing AddInventory controller

// Config Router & CORS
const InventoryRouterManagement = Router(); // Creating a new Router instance

// import all Controllers Middleware
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Importing AddInventoryMiddleware middleware

// export router
export default InventoryRouterManagement; // Exporting InventoryRouterManagement

/* These lines of code are defining a route for handling HTTP POST requests to add inventory data. */
// All Routes that can handle requests
InventoryRouterManagement.post('/add', json(), AccountExistMiddleware, AddInventory); // Add Inventory Route