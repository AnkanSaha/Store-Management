import { StoreManagementModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts

// import Custom Response
import { Success_Response, Failed_Response } from '../../helper/API Response'; // Response Path: src/helper/API Response.ts

// interface for the employee
interface EmployeeAdd {
    User_id: number;
    EmployeeName: string;
    EmployeeEmail: string;
    EmployeePhoneNumber: number;
    EmployeeMonthlySalary: number;
    EmployeeRole: string;
    EmployeeDateOfJoining: string;
}

export async function AddnewEmployee(req: any, res: any) {
    let {
        EmployeeName,
        EmployeeEmail,
        EmployeeMonthlySalary,
        EmployeePhoneNumber,
        EmployeeDateOfJoining,
        EmployeeRole,
        User_id,
    }: EmployeeAdd = req.body; // Getting the data from the request body

    // Lowercase the email
    let ShortedOwnerEmail = EmployeeEmail.toLowerCase();

    try {
        // Finding the employee in the database
        let EmployeeFindStatus: any = await StoreManagementModel.find({
            User_id: User_id,
        });

        //Checking if the employee is already in the array
        let EmployeeAlreadyExist = EmployeeFindStatus[0].Employees.filter((Employee: any) => {
            return Employee.EmployeeEmail == ShortedOwnerEmail || Employee.EmployeePhoneNumber == EmployeePhoneNumber;
        });

        if (EmployeeAlreadyExist.length > 0) {
            Failed_Response({
                res: res,
                StatusCode: 404,
                Status: 'Employee Already Exist',
                Message: 'The Employee is already in the database',
                Data: {},
            }); // If the employee is already in the array, do nothing
        } // If the employee is already in the array, do nothing
        else if (EmployeeAlreadyExist.length == 0) {
            EmployeeFindStatus[0].Employees.push({
                EmployeeName: EmployeeName,
                EmployeeEmail: ShortedOwnerEmail,
                EmployeePhoneNumber: EmployeePhoneNumber,
                EmployeeDateOfJoining: EmployeeDateOfJoining,
                EmployeeRole: EmployeeRole,
                EmployeeMonthlySalary: EmployeeMonthlySalary,
            }); // Pushing the employee to the array

            //After pushing the employee to the array, saving the data to the database
            await StoreManagementModel.findOneAndUpdate({ User_id: User_id }, EmployeeFindStatus[0]);
            Success_Response({
                res: res,
                StatusCode: 200,
                Status: 'Employee Added',
                Message: 'The Employee is added to the database',
                Data: {},
            }); // If the employee is not in the array, push the employee to the array
        } // If the employee is not in the array, push the employee to the array
    } catch (err) {
        throw err;
    }
} // Adding a new employee

// interface for the employee to get
interface GetEmployee {
    User_id: number;
    OwnerEmail: string;
    res: any;
}

// Getting the employee from the database and sending it to the client

interface GetEmployee {
    User_id: number;
    OwnerEmail: string;
}

export async function GetEmployee(req: any, res: any) {
    let { User_id, OwnerEmail }: GetEmployee = req.query; // Getting the data from the request body
    let ShortedOwnerEmail = OwnerEmail.toLowerCase(); // Lowercase the email

    try {
        let StoreDataFind: any = await StoreManagementModel.find({
            $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }],
        }); // Finding the employee in the database

        if (StoreDataFind.length == 0) {
            Failed_Response({
                res: res,
                StatusCode: 404,
                Status: 'No Employee Found',
                Message: 'No Employee Found in the database',
                Data: {},
            }); // If the employee is not in the array, do nothing
        } else if (StoreDataFind.length > 0) {
            Success_Response({
                res: res,
                StatusCode: 200,
                Status: 'Employee Found',
                Message: 'Employee Found in the database',
                Data: StoreDataFind[0].Employees,
            });
        }
    } catch (err) {
        throw err;
    }
} // Getting the employee

// DELETE EMPLOYEE Function
export async function DeleteEmployee(req: any, res: any) {
    const { User_id, OwnerEmail, EmployeeMobileNumber, EmployeeEmail } = req.query; // Getting the data from the request query
    let ShortedOwnerEmail = OwnerEmail.toLowerCase(); // Lowercase the email
    let ShortedEmployeeEmail = EmployeeEmail.toLowerCase(); // Lowercase the email

    let StoreDataFind: any = await StoreManagementModel.find({
        $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }],
    }); // Finding the employee in the database

    let Index = StoreDataFind[0].Employees.findIndex((Employee: any) => {
        return Employee.EmployeeEmail == ShortedEmployeeEmail && Employee.EmployeePhoneNumber == EmployeeMobileNumber;
    }); // Finding the index of the employee in the array
    if (Index == -1) {
        Failed_Response({
            res: res,
            StatusCode: 404,
            Status: 'No Employee Found',
            Message: 'No Employee Found in the database',
            Data: {},
        });
        return;
    } // If the employee is not in the array, do nothing

    StoreDataFind[0].Employees.splice(Index, 1); // Removing the employee from the array

    // Re-Saving the data to the database
    await StoreManagementModel.findOneAndUpdate({ User_id: User_id }, StoreDataFind[0]);

    // Re-Finding the employee in the database
    let StoreDataFindAgain: any = await StoreManagementModel.find({
        $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }],
    }); // Finding the employee in the database again for sending the data to the client

    Success_Response({
        res: res,
        StatusCode: 200,
        Status: 'Employee Deleted',
        Message: 'Employee Deleted from the database',
        Data: StoreDataFindAgain[0].Employees,
    }); // If the employee is not in the array, push the employee to the array
} // Deleting the employee
