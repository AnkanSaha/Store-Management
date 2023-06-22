/* These lines of code are importing the necessary dependencies for the code to work properly. */
// import required dependency
import {Router, json} from "express"; // import Router from express
import CORS from "cors"; // import CORS
import { GeneralGlobalStringData } from "../../../config/Keys/General Keys"; // import GeneralGlobalStringData

import {AccountExistMiddleware} from "../../../Middleware/Store Management/AccountExistMiddileware"; // import AccountExistMiddleware

// Config Router & CORS
const InventoryRouter = Router(); // Create EmployeeRouter
InventoryRouter.use(CORS({origin: GeneralGlobalStringData.API_Allowed_URL})); // Enable CORS

// export router
export default InventoryRouter; // Export EmployeeRouter


// All Services that can process requests
import { GetAllInventory } from "../../../Service/Store Management/Inventory Management"; // import GetAllInventory controller

// All Routes that can handle requests
InventoryRouter.get("/getProducts/:User_idForParams/:OwnerEmailForParams",json(), AccountExistMiddleware, GetAllInventory) // Get Employee Route