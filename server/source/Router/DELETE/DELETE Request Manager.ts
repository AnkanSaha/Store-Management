import { Router } from 'express'; // Importing express types & Router class

const DeleteRequestManager = Router(); // Creating a new Router instance

// import all Sub-Routers
import Employee_Manage_Router from './Store Management/Employee Management'; // Importing Employee Management Router
import InventoryManagementRouter from './Store Management/Inventory Management'; // Importing Inventory Management Router
import CategoryManagementRouter from './Store Management/Category Management'; // Importing Category Management Router
import CustomerManagementRouter from './Store Management/Customer Management'; // Importing Customer Management Router

// linking all Sub-Routers to the main Router
DeleteRequestManager.use('/employee', Employee_Manage_Router); // Using Employee Management Router
DeleteRequestManager.use('/inventory', InventoryManagementRouter); // Using Employee Management Router
DeleteRequestManager.use('/category', CategoryManagementRouter); // Using Category Management Router
DeleteRequestManager.use('/customer', CustomerManagementRouter); // Using Customer Management Router

export default DeleteRequestManager; // Exporting the Router instance
