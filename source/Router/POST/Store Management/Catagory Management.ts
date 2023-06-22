import { Router, json } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import { GeneralGlobalStringData } from "../../../config/Keys/General Keys"; // Importing MongoDB URL from src/config/App Config/General Config.ts

// Config Router & CORS
const CategoryRouterManagement = Router(); // Creating a new Router instance

CategoryRouterManagement.use(CORS({
    origin: GeneralGlobalStringData.API_Allowed_URL,
})); // Using CORS middleware

// Importing Controllers
import AddNewCategory from "../../../Service/Store Management/Catagory Management"; // Controller Path: src/Service/Store Management/Catagory Management.ts

// import Middleware
import {AccountExistMiddleware} from "../../../Middleware/Store Management/AccountExistMiddileware"; // Middleware Path: src/Middleware/Store Management/Category Management.ts

// export Router
export default CategoryRouterManagement; // Exporting Router

// All routes
CategoryRouterManagement.post('/AddNewCategory', json(), AccountExistMiddleware, AddNewCategory); // Add New Category