import { Router } from 'express'; // Importing express types & Router class

const GetRequestManager = Router(); // Creating a new Router instance

// import all Sub-Routers
import EmployeeRouter from './Store Management/Employee Management'; // Import EmployeeRouter
import InventoryRouter from './Store Management/Inventory Management'; // Import InventoryRouter
import CategoryManagementRouter from './Store Management/Category Management'; // Import CategoryManagementRouter
import CustomerManagementRouter from './Store Management/Customer Management'; // Import CustomerManagementRouter
import OrderManagementRouter from './Store Management/Order Management'; // import Order Router manager

// linking all Sub-Routers to the main Router
GetRequestManager.use('/employee', EmployeeRouter); // Link EmployeeRouter to the main Router
GetRequestManager.use('/inventory', InventoryRouter); // Link InventoryRouter to the main Router
GetRequestManager.use('/category', CategoryManagementRouter); // Link CategoryManagementRouter to the main Router
GetRequestManager.use('/customer', CustomerManagementRouter); // Link CustomerManagementRouter to the main Router
GetRequestManager.use('/order', OrderManagementRouter); // Link OrderManagementRouter to the main Router

export default GetRequestManager; // Exporting the Router instance
