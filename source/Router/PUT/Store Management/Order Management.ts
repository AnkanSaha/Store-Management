import { Router, json } from "express"; // Import express and json
import CORS from "cors"; // Import cors

// import Global Data
import { GeneralGlobalStringData } from "../../../config/Keys/General Keys"; // Import General Global String Data

// import Function
import { UpdateOrderDetails } from "../../../Service/Store Management/Order Management"; // Import Update Order Details Function

// import Middleware
import AccountExistMiddleware from "../../../Middleware/Store Management/AccountExistMiddileware"; // Import Account Exist Middleware

// setup
const OrderManagementRouter: Router = Router(); // Order Management Router
OrderManagementRouter.use(CORS({
    origin: GeneralGlobalStringData.API_Allowed_URL
})); // CORS

// export Order Management Router
export default OrderManagementRouter;

// All Order Management Router
OrderManagementRouter.put("/update-order-details", json(), AccountExistMiddleware, UpdateOrderDetails); // Update Order Details Router