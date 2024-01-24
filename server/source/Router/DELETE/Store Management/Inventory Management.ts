// Importing All Required Modules
/* These lines of code are importing the necessary modules for creating an Express router and enabling
CORS (Cross-Origin Resource Sharing) functionality. */
import { Router, json } from 'express'; // Importing Express Router

import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Path: Middleware/Store Management/AccountExistMiddileware.ts

const InventoryManagementRouter = Router(); // Creating a new Express Router

export default InventoryManagementRouter; // Exporting Inventory Management Router

// import controller
import { DeleteInventory } from '../../../Service/Store Management/Inventory Management'; // Path: Controller/Store Management/Inventory Management.ts

// all routes related to inventory management
InventoryManagementRouter.delete(
    '/delete/:User_idForParams/:OwnerEmailForParams/:ProductSKU',
    json(),
    AccountExistMiddleware,
    DeleteInventory,
); // Path: Controller/Store Management/Inventory Management.ts
