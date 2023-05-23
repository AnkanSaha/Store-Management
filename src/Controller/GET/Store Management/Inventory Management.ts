/* These lines of code are importing the necessary dependencies for the code to work properly. */
// import required dependency
import {Router, json} from "express"; // import Router from express
import CORS from "cors"; // import CORS

// Config Router & CORS
const InventoryRouter = Router(); // Create EmployeeRouter
InventoryRouter.use(CORS({origin: '*'})); // Enable CORS

// export router
export default InventoryRouter; // Export EmployeeRouter


// All Services that can process requests
import { GetAllInventory } from "../../../Service/Store Management/Inventory Management"; // import GetAllInventory controller

// All Routes that can handle requests
InventoryRouter.get("/getProducts/:User_id/:OwnerEmail",json(),  GetAllInventory) // Get Employee Route