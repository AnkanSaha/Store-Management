// this middleware is used to validate the account if account exists or not

// import Models
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Import Client Account Model
import { Response } from '../../helper/API Response'; // Import API Response Function
import { StatusCodes } from 'outers'; // Import Response Code

// Global Types
type str = string; // Type for str
type int = number; // Type for number
type obj = object; // Type for object
type globe = any; // Type for globe
type blank = void; // Type for void

// interface
interface RequestinterfaceForValidation {
    body: {
        Email: str;
        Phone: int;
        PAN: str;
    };
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
export async function SignUpValidation(
    req: RequestinterfaceForValidation,
    res: obj | globe,
    next: globe,
): Promise<blank> {
    // Get Data from Request Body
    const { Email, Phone, PAN } = req.body; // Get Email from Request Body
    // Shorting email
    const ShortedEmail: str = Email.toLowerCase(); // Convert Email to Lower Case

    // Find Account if exist with same Email or Phone in typescript
    const TemporaryFindResult: obj | globe = await ClientAccountModel.find({
        $or: [{ Email: ShortedEmail }, { Phone }, { PAN }],
    }); // Find Account
    // Check if Store Exist

    if (TemporaryFindResult.length > 0) {
        const StoreExist: obj[] = await StoreManagementModel.find({
            $or: [{ User_id: TemporaryFindResult[0].User_id }, { Email: ShortedEmail }],
        }); // Find Store
        if (StoreExist.length > 0) {
            // Check if Account Exist
            Response({
                res,
                StatusCode: StatusCodes.CONFLICT,
                Status: 'Exist',
                Message: 'Account Already Exist with this Email or Phone Number ! please Login or Reset Password !',
                Data: {
                    Application_ID: TemporaryFindResult[0].User_id,
                },
            }); // Send Response

            return; // Return
        } else if (StoreExist.length === 0) {
            // Check if Account Exist
            Response({
                res,
                Status: 'Exist',
                StatusCode: StatusCodes.CONFLICT,
                Message: 'Account Already Exist with this Email or Phone Number ! please Login or Reset Password !',
                Data: {
                    Application_ID: TemporaryFindResult[0].User_id,
                },
            }); // Send Response

            return; // Return
        }
    } else if (TemporaryFindResult.length === 0) {
        next(); // Move to next middleware
    } // Check if Account Exist
} // Sign Up Function Middleware

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
export async function LoginValidation(
    req: RequestinterfaceForValidation,
    res: obj | globe,
    next: globe,
): Promise<blank> {
    // Get Data from Request Body
    const { Email } = req.body; // Get Email from Request Body

    // converting all data to lower case
    const ShortedEmail: str = Email.toLowerCase(); // Convert Email to Lower Case

    // Find Account if exist with same Email or Phone in typescript
    const FindAccountResult: obj[] = await ClientAccountModel.find({
        Email: ShortedEmail,
    }); // Find Account

    if (FindAccountResult.length === 0) {
        Response({
            res,
            Status: 'Failed',
            StatusCode: StatusCodes.BAD_REQUEST,
            Message: 'Account Not Found ! Please Create Account !',
            Data: {},
        }); // Send Not Found Response
    } else if (FindAccountResult.length > 0) {
        next(); // Move to next middleware
    }
}
