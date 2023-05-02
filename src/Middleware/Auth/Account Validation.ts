// this middleware is used to validate the account if account exists or not

// import Models
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Import Client Account Model
import { Failed_Response } from '../../helper/API Response'; // Import API Response Function


// Sign Up Function Middleware
export async function SignUpValidation(req: any, res: any, next: any) {
    // Get Data from Request Body
    const { Email, Phone, PAN } = req.body; // Get Email from Request Body
    // Shorting email
    let Shortedemail: string = Email.toLowerCase(); // Convert Email to Lower Case

    // Find Account if exist with same Email or Phone in typescript
    let Temporary_Find_Result: any = await ClientAccountModel.find({
        $or: [{ Email: Shortedemail }, { Phone: Phone }, { PAN: PAN }],
    }); // Find Account
    // Check if Store Exist
    let StoreExist: any = await StoreManagementModel.find({
        $or: [{ User_id: Temporary_Find_Result[0].User_id }, { Email: Shortedemail }],
    }); // Find Store

    if (Temporary_Find_Result.length > 0 || StoreExist.length > 0) {
        // Check if Account Exist
        Failed_Response({
            res: res,
            StatusCode: 400,
            Status: 'Exist',
            Message: 'Account Already Exist with this Email or Phone Number ! please Login or Reset Password !',
            Data: {
                Application_ID: Temporary_Find_Result[0].User_id,
            },
        }); // Send Response

        return; // Return
    } else if (Temporary_Find_Result.length == 0 || StoreExist.length == 0) {
        next(); // Move to next middleware
    }; // Check if Account Exist
}; // Sign Up Function Middleware



// Login Function Middleware
export async function LoginValidation(req: any, res: any, next: any) {
    // Get Data from Request Body
    const {Email} = req.body; // Get Email from Request Body

    // converting all data to lower case
    let Shortedemail: string = Email.toLowerCase(); // Convert Email to Lower Case

    let Find_Account_Result: any = await ClientAccountModel.find({
        Email: Shortedemail,
    }); // Find Account

    if (Find_Account_Result.length === 0) {
        Failed_Response({
            res: res,
            Status: 'Failed',
            StatusCode: 404,
            Message: 'Account Not Found ! Please Create Account !',
            Data: {},
        }); // Send Not Found Response
    } else if (Find_Account_Result.length > 0) {
        next(); // Move to next middleware
    }
}
