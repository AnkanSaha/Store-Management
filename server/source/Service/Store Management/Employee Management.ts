import { StoreManagementModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts

// import Custom Response
import { Response } from '../../helper/API Response'; // Import API Response Function
import { StatusCodes } from 'outers'; // Import Response Code

// interface for the employee

// global types
type str = string; // type for string
type int = number; // type for number
type obj = object; // type for object
type blank = void; // type for void
type globe = any; // type for any

// Global Interface for Request
interface GlobalRequestInterface {
    body: {
        OwnerEmailForBody: str;
        EmployeeName: str;
        EmployeeEmail: str;
        EmployeeMonthlySalary: int;
        EmployeePhoneNumber: int;
        EmployeeDateOfJoining: str;
        EmployeeRole: str;
        User_idForBody: int;
    };
    query: {
        User_idForQuery: int;
        OwnerEmailForQuery: str;
        EmployeeMobileNumber: int;
        EmployeeEmail: str;
    };
}

/**
 * This function adds a new employee to a database and checks if the employee already exists before
 * adding them.
 * @param {GlobalRequestInterface} req - The request object containing information about the incoming HTTP request.
 * @param {anobj | globey} res - The `res` parameter is the response object that will be sent back to the client
 * after processing the request. It contains information such as the status code, status message, and
 * data that will be returned to the client.
 */
export async function AddnewEmployee(req: GlobalRequestInterface, res: obj | globe): Promise<blank> {
    const {
        EmployeeName,
        EmployeeEmail,
        EmployeeMonthlySalary,
        EmployeePhoneNumber,
        EmployeeDateOfJoining,
        EmployeeRole,
        User_idForBody,
    } = req.body; // Getting the data from the request body

    // Lowercase the email
    const ShortedOwnerEmail: str = EmployeeEmail.toLowerCase();

    try {
        // Finding the employee in the database
        const EmployeeFindStatus: globe | obj = await StoreManagementModel.find({User_id:User_idForBody});

        // Checking if the employee is already in the array
        const EmployeeAlreadyExist: obj[] = EmployeeFindStatus[0].Employees.filter((Employee: any) => {
            return Employee.EmployeeEmail === ShortedOwnerEmail || Employee.EmployeePhoneNumber === EmployeePhoneNumber;
        });

        if (EmployeeAlreadyExist.length > 0) {
            Response({
                res,
                Status: 'Employee Already Exist',
                StatusCode: StatusCodes.CONFLICT,
                Message: 'The Employee is already in the database',
                Data: undefined,
            }); // If the employee is already in the array, do nothing
        } // If the employee is already in the array, do nothing
        else if (EmployeeAlreadyExist.length === 0) {
            EmployeeFindStatus[0].Employees.push({
                EmployeeName,
                EmployeeEmail: ShortedOwnerEmail,
                EmployeePhoneNumber,
                EmployeeDateOfJoining,
                EmployeeRole,
                EmployeeMonthlySalary,
            }); // Pushing the employee to the array

            // After pushing the employee to the array, saving the data to the database
            await StoreManagementModel.findOneAndUpdate({ User_id:User_idForBody }, EmployeeFindStatus[0]);
            Response({
                res,
                Status: 'Employee Added',
                StatusCode: StatusCodes.OK,
                Message: 'The Employee is added to the database',
                Data: undefined,
            }); // If the employee is not in the array, push the employee to the array
        } // If the employee is not in the array, push the employee to the array
      
    } catch (err) {
        throw err;
    }
} // Adding a new employee

// Getting the employee from the database and sending it to the client

/**
 * This function retrieves an employee from a database based on their user ID and owner email.
 * @param {GlobalRequestInterface} req - The request object that contains information about the incoming HTTP request.
 * @param {obj | globe} res - The response object that will be sent back to the client with the result of the
 * API call.
 */
export async function GetEmployee(req: GlobalRequestInterface, res: obj | globe): Promise<blank> {
    const { User_idForQuery, OwnerEmailForQuery } = req.query; // Getting the data from the request body
    const ShortedOwnerEmail: str = OwnerEmailForQuery.toLowerCase(); // Lowercase the email

    try {
        const StoreDataFind: globe[] = await StoreManagementModel.find({
            $and: [{ User_id:User_idForQuery }, { Email: ShortedOwnerEmail }],
        }); // Finding the employee in the database

        if (StoreDataFind.length === 0) {
            Response({
                res,
                Status: 'No Employee Found',
                StatusCode: StatusCodes.NOT_FOUND,
                Message: 'No Employee Found in the database',
                Data: undefined,
            }); // If the employee is not in the array, do nothing
        } else if (StoreDataFind.length > 0) {
            Response({
                res,
                Status: 'Employee Found',
                StatusCode: StatusCodes.FOUND,
                Message: 'Employee Found in the database',
                Data: StoreDataFind[0].Employees,
            });
        }
    } catch (err) {
        throw err;
    }
} // Getting the employee

// DELETE EMPLOYEE Function
/**
 * This function deletes an employee from a database based on the provided query parameters.
 * @param {GlobalRequestInterface} req - The request object containing information about the HTTP request made by the
 * client.
 * @param {obj | globe} res - The response object that will be sent back to the client.
 * @returns The function does not return anything explicitly, but it sends a response to the client
 * using the Success_Response or Failed_Response functions.
 */
export async function DeleteEmployee(req: GlobalRequestInterface, res: obj | globe): Promise<blank> {
    const { User_idForQuery, OwnerEmailForQuery, EmployeeMobileNumber, EmployeeEmail } = req.query; // Getting the data from the request query
    const ShortedOwnerEmail: str = OwnerEmailForQuery.toLowerCase(); // Lowercase the email
    const ShortedEmployeeEmail: str = EmployeeEmail.toLowerCase(); // Lowercase the email

    const StoreDataFind: any = await StoreManagementModel.find({
        $and: [{ User_id:User_idForQuery }, { Email: ShortedOwnerEmail }],
    }); // Finding the employee in the database


    const DeletedArrayOfEmployeeData: globe[] = StoreDataFind[0].Employees.filter((Employee: any) => {
        return Employee.EmployeeEmail !== ShortedEmployeeEmail && String(Employee.EmployeePhoneNumber) !== String(EmployeeMobileNumber);
    }); // Getting Array of Employee Data after deleting the employee

    if(StoreDataFind[0].Employees.length === 0){
        Response({
            res,
            Status: 'Employee Not Found',
            StatusCode: StatusCodes.NOT_FOUND,
            Message: 'Employee Not Found in the database',
            Data: undefined
        })
    }
    else{
        StoreDataFind[0].Employees = DeletedArrayOfEmployeeData // Updating the array of employees

    // Re-Saving the data to the database
    await StoreManagementModel.findOneAndUpdate({ User_id:User_idForQuery }, {Employees:StoreDataFind[0].Employees});

    // Re-Finding the employee in the database
    const StoreDataFindAgain: obj | globe = await StoreManagementModel.find({
        $and: [{ User_id:User_idForQuery }, { Email: ShortedOwnerEmail }],
    }); // Finding the employee in the database again for sending the data to the client

    Response({
        res,
        Status: 'Employee Deleted',
        StatusCode: StatusCodes.ACCEPTED,
        Message: 'Employee Deleted from the database',
        Data: StoreDataFindAgain[0].Employees,
    }); // If the employee is not in the array, push the employee to the array
    }
} // Deleting the employee

// Update Employee Function

/**
 * The function updates employee details by finding the employee in the database and then finding their
 * index in an array of employees based on their email and phone number.
 * @param {GlobalRequestInterface} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, and body. In this code, it is
 * being used to extract data from the request body using destructuring.
 * @param {obj | globe} res - `res` is the response object that is used to send a response back to the client
 * who made the request. It contains methods and properties that allow you to set the status code,
 * headers, and body of the response.
 */
export async function UpdateEmployee(req: GlobalRequestInterface, res: obj | globe): Promise<blank> {
    const {
        OwnerEmailForBody,
        EmployeeName,
        EmployeeEmail,
        EmployeeMonthlySalary,
        EmployeePhoneNumber,
        EmployeeDateOfJoining,
        EmployeeRole,
        User_idForBody,
    } = req.body; // Getting the data from the request body


    const ShortedOwnerEmail: str = OwnerEmailForBody.toLowerCase(); // Lowercase the email
    const ShortedEmployeeEmail: str = EmployeeEmail.toLowerCase(); // Lowercase the email


    const StoreDataFind: globe | obj = await StoreManagementModel.find({
        $and: [{ User_id:User_idForBody }, { Email: ShortedOwnerEmail }],
    }); // Finding the employee in the database


    const FilteredArrayOfRemovedEmployeeData: globe[] = StoreDataFind[0].Employees.filter((Employee: obj | globe) => {
        return Employee.EmployeeEmail !== ShortedEmployeeEmail && String(Employee.EmployeePhoneNumber) !== String(EmployeePhoneNumber);
    }); // Finding the index of the employee in the array

    FilteredArrayOfRemovedEmployeeData.push({
        EmployeeName,
        EmployeeEmail: ShortedEmployeeEmail,
        EmployeePhoneNumber,
        EmployeeDateOfJoining,
        EmployeeRole,
        EmployeeMonthlySalary,
    }); // Pushing the employee to the array

    StoreDataFind[0].Employees = FilteredArrayOfRemovedEmployeeData; // Updating the array of employees in the database

    await StoreManagementModel.findOneAndUpdate({ User_id:User_idForBody }, {Employees:StoreDataFind[0].Employees}); // Re-Saving the data to the database

    // Re-Finding the employee in the database
    const StoreDataFindAgain: any = await StoreManagementModel.find({
        $and: [{ User_id:User_idForBody }, { Email: ShortedOwnerEmail }],
    }); // Finding the employee in the database again for sending the data to the client
    Response({
        res,
        Status: 'Employee Updated',
        StatusCode: StatusCodes.ACCEPTED,
        Message: 'Employee details updated in the database',
        Data: StoreDataFindAgain[0].Employees,
    }); // If the employee is not in the array, push the employee to the array
}
