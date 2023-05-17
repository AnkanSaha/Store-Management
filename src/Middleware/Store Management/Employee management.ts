/* The code is importing two models, `ClientAccountModel` and `StoreManagementModel`, from the
`../../Models/index` file path. It is also importing a custom response function `Failed_Response`
from the `../../helper/API Response` file path. These imports are necessary for the middleware
functions to access and manipulate data from the database and to send appropriate responses to the
client. */
// import all models
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts

// import Custom Response
import { Failed_Response } from '../../helper/API Response'; // Response Path: src/helper/API Response.ts

/* The `EmployeeAdd` interface is defining the structure of the data that is expected to be received in
the request body for the employee add middleware. It specifies that the request body should contain
a `User_id` property of type `number`. This interface is used to ensure that the data received in
the request body is of the correct format and can be properly processed by the middleware function. */
// interface for the employee Add Middleware

// global types
type str = string; // Type for str
type num = number; // Type for number
type obj = object; // Type for object
type globe = any; // Type for globe
type blank = void; // Type for void

// interface
interface GlobalInterFaceForEmployee {
  body : {
    User_id: num;
    OwnerEmail: str;
  };
  query : {
    User_id: num;
    OwnerEmail: str;
  }
}

/**
 * This is a middleware function in TypeScript that checks if an employee exists in the database before
 * adding them.
 * @param {GlobalInterFaceForEmployee} req - The request object that contains information about the HTTP request made by the
 * client.
 * @param {globe} res - The response object that will be sent back to the client.
 * @param {globe} next - next is a function that is called to move to the next middleware function in the
 * chain. It is used to pass control to the next middleware function in the stack. If there are no more
 * middleware functions left in the stack, it is used to pass control to the final handler function.
 */
// Employee Add Middleware
export const CheckEmployeeAddMiddleware = async (req: GlobalInterFaceForEmployee , res: obj|globe, next: any) : Promise<blank> => {
   /* This line of code is using destructuring assignment to extract the `User_id` property from the
   `req.body` object and assign it to a variable named `User_id`. The `EmployeeAdd` interface is
   used to specify the expected structure of the `req.body` object, and the `: EmployeeAdd` part of
   the code is specifying that the `req.body` object should conform to the `EmployeeAdd` interface.
   This line of code is essentially extracting the `User_id` property from the request body and
   assigning it to a variable for further use in the middleware function. */
    let { User_id } = req.body; // Getting the data from the request body

   /* `let AccountFindStatus = await ClientAccountModel.find({ User_id: User_id })` is finding an
   employee account in the database by searching for a document in the `ClientAccountModel`
   collection that has a `User_id` property matching the `User_id` value passed in the request body.
   The `await` keyword is used to wait for the database query to complete before moving on to the
   next line of code. The result of the query is stored in the `AccountFindStatus` variable, which
   is an array of documents that match the search criteria. */
    let AccountFindStatus : obj[] = await ClientAccountModel.find({
        User_id: User_id,
    }); // Finding the employee in the database

  /* This code block is checking if an employee account exists in the database by searching for a
  document in the `ClientAccountModel` collection that has a `User_id` property matching the
  `User_id` value passed in the request body. If the search returns an empty array, it means that
  the employee account does not exist in the database, and the middleware function sends a failed
  response to the client with a 404 status code and a message indicating that the account was not
  found in the database. If the search returns an array with one or more documents, it means that
  the employee account exists in the database, and the middleware function calls the `next()`
  function to move to the next middleware function in the stack. */
    if (AccountFindStatus.length == 0) {
        Failed_Response({
            res: res,
            Status: 'Accont Not Found',
            Message: 'The Account is not found in the database',
            Data: {},
        }); // If the employee is not in the array, push the employee to the array
    } else if (AccountFindStatus.length > 0) {
        next(); // Move to next middleware
    }
};

/**
 * This TypeScript function is a middleware that checks if an employee can be deleted by verifying
 * their existence in the database.
 * @param {GlobalInterFaceForEmployee} req - The request object that contains information about the incoming HTTP request.
 * @param {globe} res - The response object that will be sent back to the client.
 * @param {globe} next - next is a function that is called to move to the next middleware function in the
 * chain. It is typically used to pass control to the next middleware function after the current
 * middleware function has completed its task.
 */
// Employee Delete Middleware
export const CheckEmployeeDeleteMiddleware = async (req: GlobalInterFaceForEmployee, res: obj|globe, next: any): Promise<blank> => {
   /* This code is extracting the `User_id` and `OwnerEmail` properties from the `req.query` object and
   assigning them to variables named `User_id` and `OwnerEmail`, respectively, using destructuring
   assignment. The `req.query` object contains the query parameters that were sent in the HTTP
   request. */
    const {User_id, OwnerEmail} = req.query; // Getting the data from the request query

    let ShortedEmployeeEmail = OwnerEmail.toLowerCase(); // Lowercase the email

   /* This line of code is finding an employee account in the database by searching for a document in
   the `ClientAccountModel` collection that has a `User_id` property matching the `User_id` value
   passed in the request body. The `await` keyword is used to wait for the database query to
   complete before moving on to the next line of code. The result of the query is stored in the
   `AccountFindStatus` variable, which is an array of documents that match the search criteria. */
    let AccountFindStatus: obj[] = await ClientAccountModel.find({
        User_id: User_id,
    }); // Finding the employee in the database

   /* This code block is checking if an employee account exists in the database by searching for a
   document in the `ClientAccountModel` collection that has a `User_id` property matching the
   `User_id` value passed in the request body. If the search returns an empty array, it means that
   the employee account does not exist in the database, and the middleware function sends a failed
   response to the client with a 404 status code and a message indicating that the account was not
   found in the database. If the search returns an array with one or more documents, it means that
   the employee account exists in the database, and the middleware function moves on to the next
   step of checking if the employee is associated with a store in the `StoreManagementModel`
   collection. */
    if (AccountFindStatus.length == 0) {
        Failed_Response({
            res: res,
            Status: 'Accont Not Found',
            Message: 'The Account is not found in the database',
            Data: {},
        }); // If the employee is not in the array, push the employee to the array
    } else if (AccountFindStatus.length > 0) {
        let StoreDataFind: obj[] = await StoreManagementModel.find({
            $and: [{ User_id: User_id }, { Email: ShortedEmployeeEmail }],
        }); // Finding the employee in the database

       /* This code block is checking if an employee is associated with a store in the
       `StoreManagementModel` collection. It does this by searching for a document in the
       `StoreManagementModel` collection that has a `User_id` property matching the `User_id` value
       passed in the request query and an `Email` property matching the `OwnerEmail` value passed in
       the request query. If the search returns an empty array, it means that the employee is not
       associated with a store in the database, and the middleware function sends a failed response
       to the client with a 404 status code and a message indicating that no store was found in the
       database. If the search returns an array with one or more documents, it means that the
       employee is associated with a store in the database, and the middleware function calls the
       `next()` function to move to the next middleware function in the stack. */
        if (StoreDataFind.length == 0) {
            Failed_Response({res:res, Status:"No Store Found", Message:"No Store Found in the database", Data:{}}) // If the employee is not in the array, do nothing
        } else if (StoreDataFind.length > 0) {
            next(); // Move to next middleware
        }
    }
}


// Middleware for checking if the employee can be updated

export const CheckEmployeeUpdateMiddleware = async (req: GlobalInterFaceForEmployee, res: obj|globe, next: any) :Promise<blank> => {
       /* This line of code is using destructuring assignment to extract the `User_id` property from the
   `req.body` object and assign it to a variable named `User_id`. The `EmployeeAdd` interface is
   used to specify the expected structure of the `req.body` object, and the `: EmployeeAdd` part of
   the code is specifying that the `req.body` object should conform to the `EmployeeAdd` interface.
   This line of code is essentially extracting the `User_id` property from the request body and
   assigning it to a variable for further use in the middleware function. */
   let { User_id } = req.body; // Getting the data from the request body

   /* `let AccountFindStatus = await ClientAccountModel.find({ User_id: User_id })` is finding an
   employee account in the database by searching for a document in the `ClientAccountModel`
   collection that has a `User_id` property matching the `User_id` value passed in the request body.
   The `await` keyword is used to wait for the database query to complete before moving on to the
   next line of code. The result of the query is stored in the `AccountFindStatus` variable, which
   is an array of documents that match the search criteria. */
    let AccountFindStatus : obj[] = await ClientAccountModel.find({
        User_id: User_id,
    }); // Finding the employee in the database

  /* This code block is checking if an employee account exists in the database by searching for a
  document in the `ClientAccountModel` collection that has a `User_id` property matching the
  `User_id` value passed in the request body. If the search returns an empty array, it means that
  the employee account does not exist in the database, and the middleware function sends a failed
  response to the client with a 404 status code and a message indicating that the account was not
  found in the database. If the search returns an array with one or more documents, it means that
  the employee account exists in the database, and the middleware function calls the `next()`
  function to move to the next middleware function in the stack. */
    if (AccountFindStatus.length == 0) {
        Failed_Response({
            res: res,
            Status: 'Accont Not Found',
            Message: 'The Account is not found in the database',
            Data: {},
        }); // If the employee is not in the array, push the employee to the array
    } else if (AccountFindStatus.length > 0) {
        next(); // Move to next middleware
    }
}
