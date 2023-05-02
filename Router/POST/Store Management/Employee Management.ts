import { Router, json } from 'express'; // Importing Router from express
import CORS from 'cors'; // Importing CORS from cors

// Importing Employee Controller

//Creating an instance of Router
const EmployeeRouterManagement = Router(); // Creating an instance of Router

// Using CORS
EmployeeRouterManagement.use(CORS({ origin: '*' })); // Using CORS

//import controller function
import { AddnewEmployee, GetEmployee } from '../../../Function/Store Management/Employee Management'; // Path: Function/Account Management/Employee Management.ts

//InterFace for Employee
interface EmployeeAdd {
    User_id: number;
    EmployeeName: string;
    EmployeeEmail: string;
    EmployeePhoneNumber: number;
    EmployeeMonthlySalary: number;
    EmployeeRole: string;
    EmployeeDateOfJoining: string;
}

interface GetEmployee {
    User_id: number;
    OwnerEmail: string;
}

// All Routes
EmployeeRouterManagement.post('/create', json(), async (req, res) => {
    let {
        EmployeeName,
        EmployeeEmail,
        EmployeeMonthlySalary,
        EmployeePhoneNumber,
        EmployeeDateOfJoining,
        EmployeeRole,
        User_id,
    }: EmployeeAdd = req.body; // Getting the data from the request body

    await AddnewEmployee({
        User_id: User_id,
        EmployeeDateOfJoining: EmployeeDateOfJoining,
        EmployeeEmail: EmployeeEmail,
        EmployeeMonthlySalary: EmployeeMonthlySalary,
        EmployeeName: EmployeeName,
        EmployeePhoneNumber: EmployeePhoneNumber,
        EmployeeRole: EmployeeRole,
        res: res,
    }); // Calling the controller function
}); // Creating an employee

// Get All Employees
EmployeeRouterManagement.post('/get', json(), async (req, res) => {
    let { User_id, OwnerEmail }: GetEmployee = req.body; // Getting the data from the request body

    await GetEmployee({ User_id: User_id, OwnerEmail: OwnerEmail, res: res }); // Calling the controller function
}); // Getting all the employees

//Exporting the Router
export default EmployeeRouterManagement;
