// global types
type str = string; // type for string
type int = number; // type for number
type obj = object; // type for object
type globe = any; // type for any
type blank = void; // type for void


interface Request {
    body: {
        User_idForBody: int,
        OwnerEmailForBody: str,
    },
    query : {
        User_idForQuery: int;
        OwnerEmailForQuery: str;
      },
      params : {
        User_idForParams: int;
        OwnerEmailForParams: str;
      }
}

// import all models
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts
// EmployeeEmail

// import Custom Response
import { Response } from '../../helper/API Response'; // Response Path: src/helper/API Response.ts
import { StatusCodes } from 'outers'; // Import Response Code

// export default CategoryMiddleware; // Exporting Middleware
export default AccountExistMiddleware; // Exporting Middleware

/**
 * This is a TypeScript middleware function for category management that checks if an account and its
 * associated store exist in the database before calling the next middleware.
 * @param {Request} req - The request object that contains information about the incoming request from
 * the client.
 * @param {obj | globe} res - The response object that will be sent back to the client.
 * @param {globe} next - `next` is a function that is called to pass control to the next middleware
 * function in the stack. It is typically called at the end of the current middleware function to
 * indicate that it has completed its processing and the next middleware function can take over.
 */
export async function AccountExistMiddleware(req:Request, res: obj | globe, next:globe) : Promise<blank>{
    try{
        const {User_idForQuery, OwnerEmailForQuery} = req.query; // Destructure the request body
        const {User_idForBody, OwnerEmailForBody} = req.body; // Destructure the request body
        const {User_idForParams, OwnerEmailForParams} = req.params; // Destructure the request body
        // short the email and user id
        const ShortedOwnerEmail:str = OwnerEmailForQuery ? OwnerEmailForQuery.toLowerCase() : OwnerEmailForBody ? OwnerEmailForBody.toLowerCase() : OwnerEmailForParams.toLowerCase(); // Lowercase the email
        const UserId:int = User_idForQuery ? User_idForQuery: User_idForBody ? User_idForBody : User_idForParams; // Destructure the request body
        // Check if the account exists in the database
        const AccountFindStatus : obj[] = await ClientAccountModel.find({
            $and: [{User_id:UserId}, {Email: ShortedOwnerEmail}]
        }); // Finding the employee in the database
         if (AccountFindStatus.length === 0) {
            Response({
                res,
                Status: 'Account Not Found',
                StatusCode: StatusCodes.NOT_FOUND,
                Message: 'The Account is not found in the database',
                Data: undefined,
            }); // If the employee is not in the array, push the employee to the array
        } else if (AccountFindStatus.length > 0) {
            // If the account is found, find the store of the account
            const StoreDataFind: obj[] = await StoreManagementModel.find({
                $and: [{ User_id:UserId }, { Email: ShortedOwnerEmail }],
            }); // Finding the owner store in the database

            // If the store is not found, send a response to the client
            if (StoreDataFind.length === 0) {
                Response({
                    res,
                    Status: 'Store Not Found',
                    StatusCode: StatusCodes.NOT_FOUND,
                    Message: 'The Store is not found in the database',
                    Data: undefined,
                }); // If the employee is not in the array, push the employee to the array
            }
            // If the store is found, call the next middleware
            else if (StoreDataFind.length > 0) {
                next(); // Calling the next middleware
            };
        };
    }
    catch(error: globe){
        Response({res, Status:'Internal Server Error', StatusCode: StatusCodes.INTERNAL_SERVER_ERROR, Message: error, Data: undefined});
    }
}; // Middleware for Category Management