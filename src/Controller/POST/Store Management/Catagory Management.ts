import { Router, json } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors

// Config Router & CORS
const CategoryRouterManagement = Router(); // Creating a new Router instance

CategoryRouterManagement.use(CORS({
    origin: '*',
})); // Using CORS middleware

// Importing Controllers
import AddNewCategory from "../../../Service/Store Management/Catagory Management"; // Controller Path: src/Service/Store Management/Catagory Management.ts

// import Middleware
import CategoryMiddleware from "../../../Middleware/Store Management/Category Management"; // Middleware Path: src/Middleware/Store Management/Category Management.ts

// export Router
export default CategoryRouterManagement; // Exporting Router

// All routes
CategoryRouterManagement.post('/AddNewCategory', json(), CategoryMiddleware, AddNewCategory); // Add New Category