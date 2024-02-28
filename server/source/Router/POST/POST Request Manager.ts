import { Router } from 'express'; // Importing express types & Router class

const PostRequestManager = Router(); // Creating a new Router instance

// import all Sub-Routers
import Authenticate from './Auth/Authentication'; // Importing Authentication Router
import EmployeeRouterManagement from './Store Management/Employee Management'; // Importing Employee Management Router
import InventoryRouterManagement from './Store Management/Inventory Management'; // Importing Inventory Management Router
import CategoryRouterManagement from './Store Management/Catagory Management'; // Importing Catagory Management Router
import OrderManagementRouter from './Store Management/Order Management'; // Importing Order Management Router
import ForgotPasswordRouter from './Auth/Forgot Password'; // Importing Forgot Password Router

// linking all Sub-Routers to the main Router
PostRequestManager.use('/auth', Authenticate); // Linking Authentication Router to the main Router
PostRequestManager.use('/employee', EmployeeRouterManagement); // Linking Employee Management Router to the main Router
PostRequestManager.use('/inventory', InventoryRouterManagement); // Linking Employee Management Router to the main Router
PostRequestManager.use('/category', CategoryRouterManagement); // Linking Employee Management Router to the main Router
PostRequestManager.use('/order', OrderManagementRouter); // Linking Order Management Router to the main Router
PostRequestManager.use('/forgot-password', ForgotPasswordRouter); // Linking Forgot Password Router to the main Router

export default PostRequestManager; // Exporting the Router instance
