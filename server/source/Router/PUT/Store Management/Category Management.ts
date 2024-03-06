import { Router, json } from 'express'; // Express

// import Middlewares
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Account Exist Middleware

// import Functions
import { UpdateCategory } from '../../../Service/Store Management/Catagory Management'; // Update Category Function

// Setup the Router
const CategoryManagementRouter: Router = Router(); // Setup the Router

// Export the Router
export default CategoryManagementRouter; // Export the Router

// All Routes
CategoryManagementRouter.put('/update-category', json(), AccountExistMiddleware, UpdateCategory); // Update Category Route
