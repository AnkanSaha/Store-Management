import { Router, json } from "express"; // import Router


// import Controller
import { GetOrderDetails } from "../../../Service/Store Management/Order Management"; // import GetOrderDetails

// import Middleware
import {AccountExistMiddleware} from "../../../Middleware/Store Management/AccountExistMiddileware"; // import AccountExistMiddleware

// Setting up the router
const OrderManagementRouter: Router = Router(); // Setting up the Router

// export the router
export default OrderManagementRouter;

// All Routes
OrderManagementRouter.get('/GetAllOrders/:OwnerEmailForParams/:User_idForParams', json(), AccountExistMiddleware, GetOrderDetails);