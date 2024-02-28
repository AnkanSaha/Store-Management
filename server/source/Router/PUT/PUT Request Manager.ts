import { Router } from 'express'; // Importing express types & Router class

const PutRequestManager = Router(); // Creating a new Router instance

// import all Sub-Routers
import EmployeeRouterManagement from './Store Management/Employee Management'; // Importing Employee Management Router
import InventoryRouterManagement from './Store Management/Inventory Management'; // Importing Inventory Management Router
import CategoryManagementRouter from './Store Management/Category Management'; // Importing Category Management Router
import OrderManagementRouter from './Store Management/Order Management'; // Importing Order Management Router

// linking all Sub-Routers to the main Router
PutRequestManager.use('/employee', EmployeeRouterManagement); // Linking Employee Management Router to the main Router
PutRequestManager.use('/inventory', InventoryRouterManagement); // Linking Employee Management Router to the main Router
PutRequestManager.use('/category', CategoryManagementRouter); // Linking Employee Management Router to the main Router
PutRequestManager.use('/order', OrderManagementRouter); // Linking Employee Management Router to the main Router

export default PutRequestManager; // Exporting the Router instance
