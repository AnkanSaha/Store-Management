/* These lines of code are importing the `StoreManagementModel` from the `../../Models/index` file and
the `Success_Response` and `Failed_Response` functions from the `../../helper/API Response` file.
These imported modules are then used in the functions defined in the code. */
import { StoreManagementModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts

// import Custom Response
import { Response } from '../../helper/API Response'; // Import API Response Function
import { StatusCodes } from 'outers'; // Import Response Code
/* Defining an interface named `EmployeeAdd` which specifies the properties and their types that are
expected to be present in the request body when adding a new employee. These properties include
`User_id`, `EmployeeName`, `EmployeeEmail`, `EmployeePhoneNumber`, `EmployeeMonthlySalary`,
`EmployeeRole`, and `EmployeeDateOfJoining`. This interface is used to ensure that the request body
contains all the required properties and their types match the expected types. */
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
    /* This line of code is using destructuring assignment to extract the properties `EmployeeName`,
   `EmployeeEmail`, `EmployeeMonthlySalary`, `EmployeePhoneNumber`, `EmployeeDateOfJoining`,
   `EmployeeRole`, and `User_id` from the `req.body` object. It is also using type assertion to
   ensure that the extracted properties match the expected types defined in the `EmployeeAdd`
   interface. This line of code is essentially getting the data from the request body and assigning
   it to variables with meaningful names for further use in the function. */
    const {
        EmployeeName,
        EmployeeEmail,
        EmployeeMonthlySalary,
        EmployeePhoneNumber,
        EmployeeDateOfJoining,
        EmployeeRole,
        User_idForBody,
    } = req.body; // Getting the data from the request body

    /* This line of code is converting the `EmployeeEmail` string to lowercase and assigning the result
   to the `ShortedOwnerEmail` variable. This is likely done to ensure consistency in the email
   format and avoid any issues that may arise from case sensitivity when comparing or storing email
   addresses. */
    // Lowercase the email
    const ShortedOwnerEmail: str = EmployeeEmail.toLowerCase();

    /* This code block is trying to find an employee in the database by querying the
   `StoreManagementModel` using the `User_id` provided in the request body. It then checks if the
   employee already exists in the `Employees` array of the retrieved data by filtering the array
   based on whether the `EmployeeEmail` or `EmployeePhoneNumber` matches the values provided in the
   request body. The result of this filter operation is stored in the `EmployeeAlreadyExist`
   variable for further use in the function. */
    try {
        // Finding the employee in the database
        const EmployeeFindStatus: globe | obj = await StoreManagementModel.find({User_id:User_idForBody});

        /* This code block is checking if an employee already exists in the `Employees` array of the
       retrieved data from the database. It does this by filtering the array based on whether the
       `EmployeeEmail` or `EmployeePhoneNumber` matches the values provided in the request body. The
       result of this filter operation is stored in the `EmployeeAlreadyExist` variable for further
       use in the function. If the length of the `EmployeeAlreadyExist` array is greater than 0, it
       means that the employee already exists in the array and the function returns a failed
       response. If the length of the `EmployeeAlreadyExist` array is 0, it means that the employee
       does not exist in the array and the function proceeds to add the employee to the array. */
        // Checking if the employee is already in the array
        const EmployeeAlreadyExist: obj[] = EmployeeFindStatus[0].Employees.filter((Employee: any) => {
            return Employee.EmployeeEmail === ShortedOwnerEmail || Employee.EmployeePhoneNumber === EmployeePhoneNumber;
        });

        /* This code block is checking if an employee already exists in the `Employees` array of the
       retrieved data from the database. It does this by filtering the array based on whether the
       `EmployeeEmail` or `EmployeePhoneNumber` matches the values provided in the request body. If
       the length of the `EmployeeAlreadyExist` array is greater than 0, it means that the employee
       already exists in the array and the function returns a failed response with a status code of
       404 and a message indicating that the employee already exists in the database. If the length
       of the `EmployeeAlreadyExist` array is 0, it means that the employee does not exist in the
       array and the function proceeds to add the employee to the array by pushing the employee
       object to the `Employees` array of the retrieved data and then saving the updated data to the
       database. */
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
            /* This code block is updating the `StoreManagementModel` in the database with the new
           employee data. It uses the `findOneAndUpdate` method to find the document in the
           `StoreManagementModel` collection that matches the `User_id` provided in the request body
           and updates it with the new employee data stored in the `EmployeeFindStatus[0]` object.
           Once the update is complete, it sends a success response to the client with a status code
           of 200, a status message of 'Employee Added', and an empty data object. */
            await StoreManagementModel.findOneAndUpdate({ User_id:User_idForBody }, EmployeeFindStatus[0]);
            Response({
                res,
                Status: 'Employee Added',
                StatusCode: StatusCodes.OK,
                Message: 'The Employee is added to the database',
                Data: undefined,
            }); // If the employee is not in the array, push the employee to the array
        } // If the employee is not in the array, push the employee to the array
        /* This code block is catching any errors that may occur during the execution of the `try` block and
   throwing them to be handled by the calling function or the global error handler. The `throw`
   statement is used to throw an exception, which will stop the execution of the current function
   and pass the error object to the next level of error handling. By throwing the error, the
   function is indicating that it was unable to complete its intended task and that an error
   occurred. */
    } catch (err) {
        throw err;
    }
} // Adding a new employee

// Getting the employee from the database and sending it to the client

/* The `GetEmployee` interface is defining the expected properties and their types for the request
query parameters when retrieving an employee from the database. It includes the `User_id` property
of type `number` and the `OwnerEmail` property of type `string`. This interface is used to ensure
that the request query parameters contain all the required properties and their types match the
expected types. */

/**
 * This function retrieves an employee from a database based on their user ID and owner email.
 * @param {GlobalRequestInterface} req - The request object that contains information about the incoming HTTP request.
 * @param {obj | globe} res - The response object that will be sent back to the client with the result of the
 * API call.
 */
export async function GetEmployee(req: GlobalRequestInterface, res: obj | globe): Promise<blank> {
    /* The above code is written in TypeScript and it is extracting the values of `User_id` and
   `OwnerEmail` from the `req.query` object. It then converts the `OwnerEmail` to lowercase and
   assigns it to a new variable `ShortedOwnerEmail`. */
    const { User_idForQuery, OwnerEmailForQuery } = req.query; // Getting the data from the request body
    const ShortedOwnerEmail: str = OwnerEmailForQuery.toLowerCase(); // Lowercase the email

    /* The above code is finding an employee in the database based on the provided User_id and
    ShortedOwnerEmail. If the employee is found, it returns a success response with the employee
    data. If the employee is not found, it returns a failed response with a message indicating that
    no employee was found in the database. The code is written in TypeScript and uses the try-catch
    block to handle any errors that may occur during the execution of the code. */
    try {
        /* The above code is using the Mongoose library to perform a database query to find data in the
     "StoreManagementModel" collection that matches the specified conditions. The conditions are
     that the "User_id" field matches the value of the "User_id" variable and the "Email" field
     matches the value of the "ShortedOwnerEmail" variable. The result of the query is stored in the
     "StoreDataFind" variable. The code is using the "await" keyword to wait for the query to
     complete before continuing execution. */
        const StoreDataFind: globe[] = await StoreManagementModel.find({
            $and: [{ User_id:User_idForQuery }, { Email: ShortedOwnerEmail }],
        }); // Finding the employee in the database

        /* The above code is checking if an array called `StoreDataFind` has any elements. If it has no
       elements, it sends a failed response with a 404 status code and a message saying "No Employee
       Found in the database". If it has one or more elements, it sends a success response with a
       200 status code and a message saying "Employee Found in the database", along with the data of
       the first element in the array. */
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
        /* The above code is incomplete and does not provide enough context to determine its purpose. It
   appears to be a try-catch block in TypeScript, but without the code inside the try block, it is
   impossible to determine what specific functionality it is implementing. */
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
    /* The above code is written in TypeScript and it is getting data from the request query. It is
   destructuring the `req.query` object to get the values of `User_id`, `OwnerEmail`,
   `EmployeeMobileNumber`, and `EmployeeEmail`. It then converts the `OwnerEmail` and
   `EmployeeEmail` to lowercase using the `toLowerCase()` method and stores them in
   `ShortedOwnerEmail` and `ShortedEmployeeEmail` variables respectively. */
    const { User_idForQuery, OwnerEmailForQuery, EmployeeMobileNumber, EmployeeEmail } = req.query; // Getting the data from the request query
    const ShortedOwnerEmail: str = OwnerEmailForQuery.toLowerCase(); // Lowercase the email
    const ShortedEmployeeEmail: str = EmployeeEmail.toLowerCase(); // Lowercase the email


    /* The above code is using the Mongoose library to find data in a MongoDB database. It is searching
   for a document in the "StoreManagementModel" collection that matches the specified conditions:
   the "User_id" field must match the value of the "User_id" variable, and the "Email" field must
   match the value of the "ShortedOwnerEmail" variable. The result of the query is stored in the
   "StoreDataFind" variable. */
    const StoreDataFind: any = await StoreManagementModel.find({
        $and: [{ User_id:User_idForQuery }, { Email: ShortedOwnerEmail }],
    }); // Finding the employee in the database


/* The above code is filtering an array of employee data stored in `StoreDataFind[0].Employees` based
on two conditions:
1. The `EmployeeEmail` property of each employee object should not be equal to the
`ShortedEmployeeEmail` variable.
2. The `EmployeePhoneNumber` property of each employee object, when converted to a string, should
not be equal to the `EmployeeMobileNumber` variable, also converted to a string. */

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
         /* The above code is updating and re-saving data to a database for a store management system. It
   first finds and updates the data for a specific user, then finds the updated data again and sends
   it as a response to the client. The response includes a success status code, message, and the
   updated employee data for the store. */
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
    /* The above code is written in TypeScript and it is destructuring the properties from the `req.body`
object into separate variables. These variables are used to update the employee details. The
`EmployeeUpdate` is a type/interface that defines the structure of the data being received in the
request body. */
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

    /* The above code is written in TypeScript and it is creating two variables named "ShortedOwnerEmail"
and "ShortedEmployeeEmail". These variables are assigned the lowercase version of the values stored
in the variables "OwnerEmail" and "EmployeeEmail" respectively. The purpose of this code is to
standardize the email addresses to lowercase for consistency and ease of comparison. */
    const ShortedOwnerEmail: str = OwnerEmailForBody.toLowerCase(); // Lowercase the email
    const ShortedEmployeeEmail: str = EmployeeEmail.toLowerCase(); // Lowercase the email

    /* The above code is using the Mongoose library to perform a database query to find data in the
"StoreManagementModel" collection that matches the specified conditions. The conditions are that the
"User_id" field matches the value of the "User_id" variable and the "Email" field matches the value
of the "ShortedOwnerEmail" variable. The result of the query is stored in the "StoreDataFind"
variable. The "await" keyword is used to wait for the query to complete before continuing with the
rest of the code. */
    const StoreDataFind: globe | obj = await StoreManagementModel.find({
        $and: [{ User_id:User_idForBody }, { Email: ShortedOwnerEmail }],
    }); // Finding the employee in the database

/* The above code is filtering an array of employee data stored in `StoreDataFind[0].Employees` based
on two conditions:
1. The `EmployeeEmail` property of each employee object should not be equal to the
`ShortedEmployeeEmail` variable.
2. The `EmployeePhoneNumber` property of each employee object should not be equal to the
`EmployeePhoneNumber` variable after converting both to strings. */
    const FilteredArrayOfRemovedEmployeeData: globe[] = StoreDataFind[0].Employees.filter((Employee: obj | globe) => {
        return Employee.EmployeeEmail !== ShortedEmployeeEmail && String(Employee.EmployeePhoneNumber) !== String(EmployeePhoneNumber);
    }); // Finding the index of the employee in the array

/* The above code is pushing an object containing employee data (name, email, phone number, date of
joining, role, and monthly salary) to an array called `FilteredArrayOfRemovedEmployeeData`. The
email address is shortened before being added to the object. */
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
