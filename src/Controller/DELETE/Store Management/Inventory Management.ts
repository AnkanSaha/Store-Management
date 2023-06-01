// Importing All Required Modules
/* These lines of code are importing the necessary modules for creating an Express router and enabling
CORS (Cross-Origin Resource Sharing) functionality. */
import { Router, json } from 'express'; // Importing Express Router
import CORS from 'cors'; // Importing CORS

const InventoryManagementRouter = Router(); // Creating a new Express Router


// configure Express Router to use CORS
InventoryManagementRouter.use(CORS({ origin: '*' })); // Using CORS



export default InventoryManagementRouter; // Exporting Inventory Management Router


// import controller
import { DeleteInventory } from '../../../Service/Store Management/Inventory Management'; // Path: Controller/Store Management/Inventory Management.ts

// all routes related to inventory management
InventoryManagementRouter.delete('/delete/:User_id/:OwnerEmail/:ProductSKU', json(), DeleteInventory); // Path: Controller/Store Management/Inventory Management.ts