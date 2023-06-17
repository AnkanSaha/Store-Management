import { Router, json } from "express"; // import Router from express
import CORS from "cors"; // import CORS from cors

// import global values
import { GeneralGlobalStringData } from "../../../config/App Config/General Config"; // import GeneralGlobalStringData from General Config

// import Middleware
import {AccountExistMiddleware} from "../../../Middleware/Store Management/AccountExistMiddileware"; // import AccountExistMiddleware from AccountExistMiddileware

// import functions
import { GetCategory } from "../../../Service/Store Management/Catagory Management"; // import GetCategory from Catagory Management

// create router
const CategoryManagementRouter: Router = Router(); // create CategoryManagementRouter

// Config Router
CategoryManagementRouter.use(CORS({origin: GeneralGlobalStringData.API_Allowed_URL})); // use cors


// export router
export default CategoryManagementRouter; // export CategoryManagementRouter


// Define Routes

CategoryManagementRouter.get("/getCategory/:User_idForParams/:OwnerEmailForParams", json(), AccountExistMiddleware, GetCategory); // Route for Get Category