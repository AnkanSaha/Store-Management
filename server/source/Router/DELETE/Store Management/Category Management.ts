import { Router, json } from 'express'; // import Router from express

// import Middleware
import { AccountExistMiddleware } from '../../../Middleware/Store Management/AccountExistMiddileware'; // import AccountExistMiddleware from AccountExistMiddleware.ts

// import Functions
import { DeleteCategory } from '../../../Service/Store Management/Catagory Management'; // import DeleteCategory function from Catagory Management

// Setup Router
const CategoryManagementRouter: Router = Router(); // setup CategoryManagementRouter as Router

// export CategoryManagementRouter
export default CategoryManagementRouter;

// All CategoryManagementRouter Routes Goes Here

CategoryManagementRouter.delete('/delete-category', json(), AccountExistMiddleware, DeleteCategory); // CategoryManagementRouter use json, AccountExistMiddleware and DeleteCategory function when user hit delete-category route
