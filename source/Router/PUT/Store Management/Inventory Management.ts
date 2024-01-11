/* These lines of code are importing the necessary dependencies for creating a router and enabling CORS
in an Express application. */
import { Router, json } from 'express'; // Importing express types & Router class

/* This code is configuring a router and enabling CORS (Cross-Origin Resource Sharing) middleware in an
Express application. */

// config Router & CORS
const InventoryRouterManagement = Router(); // Creating a new Router instance

// import Middleware
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Importing InventoryMiddleware function

// import all controllers
import { UpdateInventory } from '../../../Service/Store Management/Inventory Management'; // Importing UpdateInventory function

// exporting router
export default InventoryRouterManagement; // Exporting InventoryRouterManagement


// all routes that can handle requests
InventoryRouterManagement.put('/update', json(), AccountExistMiddleware, UpdateInventory); // Update Inventory Route