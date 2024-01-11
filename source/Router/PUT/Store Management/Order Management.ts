import { Router, json } from "express"; // Import express and json

// import Function
import { UpdateOrderDetails } from "../../../Service/Store Management/Order Management"; // Import Update Order Details Function

// import Middleware
import AccountExistMiddleware from "../../../Middleware/Store Management/AccountExistMiddileware"; // Import Account Exist Middleware

// setup
const OrderManagementRouter: Router = Router(); // Order Management Router

// export Order Management Router
export default OrderManagementRouter;

// All Order Management Router
OrderManagementRouter.put("/update-order-details", json(), AccountExistMiddleware, UpdateOrderDetails); // Update Order Details Router