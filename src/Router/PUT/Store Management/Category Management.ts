import {Router, json} from 'express'; // Express
import CORS from 'cors'; // CORS

// import Global Values
import { GeneralGlobalStringData } from '../../../config/App Config/General Config'; // General App Config Module

// import Middlewares
import {AccountExistMiddleware} from '../../../Middleware/Store Management/AccountExistMiddileware'; // Account Exist Middleware

// import Functions
import { UpdateCategory } from '../../../Service/Store Management/Catagory Management'; // Update Category Function

// Setup the Router
const CategoryManagementRouter: Router = Router(); // Setup the Router
CategoryManagementRouter.use(CORS({
    origin: GeneralGlobalStringData.API_Allowed_URL
})); // CORS Middleware

// Export the Router
export default CategoryManagementRouter; // Export the Router

// All Routes
CategoryManagementRouter.put('/update-category', json(), AccountExistMiddleware, UpdateCategory); // Update Category Route