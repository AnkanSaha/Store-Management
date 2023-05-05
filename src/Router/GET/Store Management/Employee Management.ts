// import required dependency
import { Router, json } from "express"; // import Router from express
import CORS from "cors"; // import CORS

// import controller
import { GetEmployee } from "../../../Controller/Store Management/Employee Management"; // import GetEmployee controller

// config router & cors
const EmployeeRouter = Router(); // Create EmployeeRouter
EmployeeRouter.use(CORS({origin: '*'})); // Enable CORS

// export router
export default EmployeeRouter; // Export EmployeeRouter

// all routes
EmployeeRouter.get("/get",json(),  GetEmployee) // Get Employee Route