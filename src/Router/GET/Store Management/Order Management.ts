import { Router, json } from "express"; // import Router
import CORS from "cors"; // import CORS


// import Controller
import { GetOrderDetails } from "../../../Service/Store Management/Order Management"; // import GetOrderDetails

// import Middleware
import {AccountExistMiddleware} from "../../../Middleware/Store Management/AccountExistMiddileware"; // import AccountExistMiddleware

// import Global String Data
import { GeneralGlobalStringData } from "../../../config/App Config/General Config"; // import GeneralGlobalStringData

// Setting up the router
const OrderManagementRouter: Router = Router(); // Setting up the Router
OrderManagementRouter.use(CORS({
    origin:GeneralGlobalStringData.API_Allowed_URL
}));

// export the router
export default OrderManagementRouter;

// All Routes
OrderManagementRouter.get('/GetAllOrders/:OwnerEmailForParams/:User_idForParams', json(), AccountExistMiddleware, GetOrderDetails);