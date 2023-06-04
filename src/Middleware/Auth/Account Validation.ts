// this middleware is used to validate the account if account exists or not

// import Models
/* The code is importing two modules: `ClientAccountModel` and `StoreManagementModel` from the
`../../Models/index` file, and `Failed_Response` function from the `../../helper/API Response` file.
These modules are then used in the middleware functions `SignUpValidation` and `LoginValidation` to
perform account validation and send API responses. */
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Import Client Account Model
import { Response } from '../../helper/API Response'; // Import API Response Function
import { ResponseCode } from '../../store'; // Import Response Code

// Global Types
type str = string; // Type for str
type num = number; // Type for number
type obj = object; // Type for object
type globe = any; // Type for globe
type blank = void; // Type for void

    // interface
    interface RequestinterfaceForValidation {
       body : {
        Email: str,
        Phone: num,
        PAN: str
       }
    }

/**
 * This is a TypeScript middleware function that validates user sign up data and checks if an account
 * or store already exists with the same email, phone, or PAN number.
 * @param {RequestinterfaceForValidation} req - The request object, which contains information about the incoming HTTP request.
 * @param {globe} res - The "res" parameter is the response object that is used to send the response back
 * to the client after the middleware function has completed its execution.
 * @param {globe} next - next is a callback function that is used to move to the next middleware function
 * in the chain. If this middleware function completes its task successfully, it calls the next()
 * function to pass control to the next middleware function.
 * @returns The function does not return gibbeting explicitly. It either sends a response and returns
 * nothing, or it calls the next middleware and returns nothing.
*/

// Sign Up Function Middleware
export async function SignUpValidation(req: RequestinterfaceForValidation, res:obj|globe, next: globe):Promise<blank> {
    /* This code is getting the data from the request body, specifically the `Email`, `Phone`, and `PAN`
    fields. It then converts the `Email` to lowercase and assigns it to the `Shortedemail` variable.
    This is done to ensure that the email is in a consistent format for validation purposes. */
    // Get Data from Request Body
    const { Email, Phone, PAN }  = req.body; // Get Email from Request Body
    // Shorting email
    let Shortedemail: str = Email.toLowerCase(); // Convert Email to Lower Case

   /* This code is checking if an account or store already exists with the same email, phone, or PAN
   number. It first retrieves the email, phone, and PAN from the request body and converts the email
   to lowercase. It then uses the `ClientAccountModel` to find globe accounts that match the email,
   phone, or PAN. If globe matches are found, it uses the `StoreManagementModel` to check if a store
   exists with the same user ID or email. If either an account or store is found, it sends a
   response indicating that the account already exists and returns. If no account or store is found,
   it calls the next middleware function in the chain. */
    // Find Account if exist with same Email or Phone in typescript
    let Temporary_Find_Result: obj | globe = await ClientAccountModel.find({
        $or: [{ Email: Shortedemail }, { Phone: Phone }, { PAN: PAN }],
    }); // Find Account
    // Check if Store Exist

    if (Temporary_Find_Result.length > 0) {
        let StoreExist: obj[] = await StoreManagementModel.find({
            $or: [{ User_id: Temporary_Find_Result[0].User_id }, { Email: Shortedemail }],
        }); // Find Store
        if(StoreExist.length > 0){
            // Check if Account Exist
            Response({
                res: res,
                StatusCode: 400,
                Status: 'Exist',
                Message: 'Account Already Exist with this Email or Phone Number ! please Login or Reset Password !',
                Data: {
                    Application_ID: Temporary_Find_Result[0].User_id,
                },
            }); // Send Response
    
            return; // Return
        }
        else if(StoreExist.length === 0){
            // Check if Account Exist
            Response({
                res: res,
                Status: 'Exist',
                StatusCode: ResponseCode.NotAllowed,
                Message: 'Account Already Exist with this Email or Phone Number ! please Login or Reset Password !',
                Data: {
                    Application_ID: Temporary_Find_Result[0].User_id,
                },
            }); // Send Response
    
            return; // Return
        }
    } else if (Temporary_Find_Result.length == 0) {
        next(); // Move to next middleware
    }; // Check if Account Exist
}; // Sign Up Function Middleware



/**
 * This is a TypeScript middleware function that validates a user's login credentials by checking if
 * their email exists in the database.
 * @param {RequestinterfaceForValidation} req - The request object represents the HTTP request that is sent by the client to the
 * server. It contains information about the request, such as the URL, headers, and body.
 * @param {globe} res - The "res" parameter is the response object that is used to send the response back
 * to the client. It contains information such as the status code, headers, and data that will be sent
 * back to the client.
 * @param {globe} next - next is a callback function that is used to move to the next middleware function
 * in the chain. If there are no more middleware functions, it will move to the route handler function.
 */
// Login Function Middleware
export async function LoginValidation(req: RequestinterfaceForValidation, res: obj|globe, next: globe):Promise<blank> {
    // Get Data from Request Body
   /* This code is getting the `Email` field from the request body using destructuring assignment and
   assigning it to a constant variable `Email`. It then converts the `Email` to lowercase and
   assigns it to the variable `Shortedemail`. This is done to ensure that the email is in a
   consistent format for validation purposes. */
    const {Email} = req.body; // Get Email from Request Body

    // converting all data to lower case
    let Shortedemail: str = Email.toLowerCase(); // Convert Email to Lower Case
    
/* This code is a TypeScript middleware function that validates a user's login credentials by checking
if their email exists in the database. It first retrieves the `Email` field from the request body
and converts it to lowercase. It then uses the `ClientAccountModel` to find globe accounts that match
the email. If no account is found, it sends a response indicating that the account was not found and
returns. If an account is found, it calls the next middleware function in the chain. */

    let Find_Account_Result: obj[] = await ClientAccountModel.find({
        Email: Shortedemail,
    }); // Find Account

    if (Find_Account_Result.length === 0) {
        Response({
            res: res,
            Status: 'Failed',
            StatusCode: ResponseCode.Fail,
            Message: 'Account Not Found ! Please Create Account !',
            Data: undefined,
        }); // Send Not Found Response
    } else if (Find_Account_Result.length > 0) {
        next(); // Move to next middleware
    }
}
