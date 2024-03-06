import { Router, json } from 'express'; // Import Router from express

// Config Router & CORS
const CategoryRouterManagement = Router(); // Creating a new Router instance

// Importing Controllers
import AddNewCategory from '../../../Service/Store Management/Catagory Management'; // Controller Path: src/Service/Store Management/Catagory Management.ts

// import Middleware
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // Middleware Path: src/Middleware/Store Management/Category Management.ts

// export Router
export default CategoryRouterManagement; // Exporting Router

// All routes
CategoryRouterManagement.post('/AddNewCategory', json(), AccountExistMiddleware, AddNewCategory); // Add New Category
