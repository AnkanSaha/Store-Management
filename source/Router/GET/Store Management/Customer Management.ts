import { Router, json } from "express"; // Import express and json
import CORS from "cors"; // Import cors

// import Global values
import { GeneralGlobalStringData } from "../../../config/Keys/General Keys"; // Path: src/config/App Config/General Config.ts

// import Middleware
import AccountExistMiddleware from "../../../Middleware/Store Management/AccountExistMiddileware"; // Path: src/Middleware/Store Management/AccountExistMiddileware.ts

// import Functions
import { getCustomerList } from "../../../Service/Store Management/Customer Management"; // Path: src/Service/Store Management/Customer Management.ts

// Setup the router
const CustomerManagementRouter:Router = Router(); // Setup the router
CustomerManagementRouter.use(CORS({
    origin: GeneralGlobalStringData.API_Allowed_URL
})); // Setup cors

// export the router
export default CustomerManagementRouter; // Export the router

// All Routers goes here
CustomerManagementRouter.get('/getCustomerList/:User_idForParams/:OwnerEmailForParams', json(), AccountExistMiddleware, getCustomerList); // Path: src/Router/GET/Store Management/Customer Management.ts