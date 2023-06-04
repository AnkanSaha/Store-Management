/* This code is importing two models, `ClientAccountModel` and `StoreManagementModel`, from the
`../../Models/index` file path. It is also importing two custom response objects, `Failed_Response`
and `NotAllowed_Response`, from the `../../helper/API Response` file path. These imports are used in
the code to access and use the functionality defined in these models and response objects. */

// global types
type str = string; // type for string
type num = number; // type for number
type obj = object; // type for object
type globe = any; // type for any
type blank = void; // type for void
type bool = boolean; // type for boolean


interface Request {
    body: {
        User_id: num,
        OwnerEmail: str,
        CategoryName: str,
        CategoryDescription: str,
        MaxProduct: num,
        isActivated: bool
    }
}

// import all models
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts
// EmployeeEmail

// import Custom Response
import { Failed_Response } from '../../helper/API Response'; // Response Path: src/helper/API Response.ts

// export default CategoryMiddleware; // Exporting Middleware
export default CategoryMiddleware; // Exporting Middleware

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
export async function CategoryMiddleware(req:Request, res: obj | globe, next:globe) : Promise<blank>{
    try{
        const {User_id, OwnerEmail} = req.body;
        let ShortedOwnerEmail:str = OwnerEmail.toLowerCase(); // Lowercase the email

        let AccountFindStatus : obj[] = await ClientAccountModel.find({
            $and: [{User_id: User_id}, {Email: ShortedOwnerEmail}]
         }); // Finding the employee in the database

         if (AccountFindStatus.length == 0) {
            Failed_Response({
                res: res,
                Status: 'Account Not Found',
                Message: 'The Account is not found in the database',
                Data: undefined,
            }); // If the employee is not in the array, push the employee to the array
        } else if (AccountFindStatus.length > 0) {
            // If the account is found, find the store of the account
            let StoreDataFind: obj[] = await StoreManagementModel.find({
                $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }],
            }); // Finding the owner store in the database

            // If the store is not found, send a response to the client
            if (StoreDataFind.length == 0) {
                Failed_Response({
                    res: res,
                    Status: 'Store Not Found',
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
        Failed_Response({res: res, Status:'Internal Server Error', Message: error, Data: undefined});
    }
}; // Middleware for Category Management
