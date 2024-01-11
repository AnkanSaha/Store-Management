import { Router, json } from "express"; // import Router from express

// import Middleware
import AccountExistMiddleware from "../../../Middleware/Store Management/AccountExistMiddileware"; // Path: src/Middleware/Store Management/AccountExistMiddileware.ts

// import Functions
import { DeleteCustomer } from "../../../Service/Store Management/Customer Management"; // Path: src/Service/Store Management/Customer Management.ts

// Setup Router
const CustomerManagementRouter : Router = Router(); // Setup Router

// export Router
export default CustomerManagementRouter; // export Router

// All Router Below
CustomerManagementRouter.delete('/delete/:User_idForParams/:OwnerEmailForParams/:CustomerID', json(), AccountExistMiddleware, DeleteCustomer); // Path: http://localhost:PORT/Store Management/Customer Management/delete/:User_idForParams/:OwnerEmailForParams/:CustomerID