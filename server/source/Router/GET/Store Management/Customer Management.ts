import { Router, json } from "express"; // Import express and json

// import Middleware
import AccountExistMiddleware from "../../../Middleware/Store Management/AccountExistMiddileware"; // Path: src/Middleware/Store Management/AccountExistMiddileware.ts

// import Functions
import { getCustomerList } from "../../../Service/Store Management/Customer Management"; // Path: src/Service/Store Management/Customer Management.ts

// Setup the router
const CustomerManagementRouter:Router = Router(); // Setup the router

// export the router
export default CustomerManagementRouter; // Export the router

// All Routers goes here
CustomerManagementRouter.get('/getCustomerList/:User_idForParams/:OwnerEmailForParams', json(), AccountExistMiddleware, getCustomerList); // Path: src/Router/GET/Store Management/Customer Management.ts