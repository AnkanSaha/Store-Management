/* These lines of code are importing the necessary dependencies for the code to work properly. */
// import required dependency
import { Router, json } from 'express'; // import Router from express

import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // import AccountExistMiddleware

// Config Router & CORS
const InventoryRouter = Router(); // Create EmployeeRouter

// export router
export default InventoryRouter; // Export EmployeeRouter

// All Services that can process requests
import { GetAllInventory } from '../../../Service/Store Management/Inventory Management'; // import GetAllInventory controller

// All Routes that can handle requests
InventoryRouter.get(
    '/getProducts/:User_idForParams/:OwnerEmailForParams',
    json(),
    AccountExistMiddleware,
    GetAllInventory,
); // Get Employee Route
