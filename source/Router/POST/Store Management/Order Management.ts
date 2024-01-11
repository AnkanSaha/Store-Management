import {Router, json} from 'express'; // Import express and json

// import Functions
import { CreateNewOrder } from '../../../Service/Store Management/Order Management'; // Import CreateNewOrder function from Order Management.ts

// import Middlewares
import AccountExistMiddleware from '../../../Middleware/Store Management/AccountExistMiddileware'; // Import AccountExistMiddleware from AccountExistMiddleware.ts

// Setup the Router
const OrderManagementRouter : Router = Router(); // Setup the OrderManagementRouter

// export the OrderManagementRouter
export default OrderManagementRouter; // Export the OrderManagementRouter

// Create New Order Route
OrderManagementRouter.post('/create-new-order', json(), AccountExistMiddleware, CreateNewOrder); // Create New Order Route