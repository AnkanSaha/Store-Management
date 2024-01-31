import { EncryptPassword } from "../../Middleware/Security/Bcrypt"; // Bcrypt
import { methods, StatusCodes } from "outers"; // Unique Generator & Status Codes

// Response and Response Code
import { Response } from "../../helper/API Response"; // API Response

// import Data Model
import { ClientAccountModel } from "../../Models"; // Client Account Model

// global types
type str = string; // Define a type for strings
type globe = any; // Define a type for global variables
type int = number; // Define a type for numbers

// interface for request
interface Request {
    body: {
        OwnerEmailForBody: str,
        User_idForBody: int,
        Token : str,
        NewPassword: str
    }
};

export default async function ResetPassword(req: Request, res: globe) {
    try{
        const {User_idForBody, OwnerEmailForBody, NewPassword } =req.body; // Define a variable for request body

        // short Email
        const ShortEmail = OwnerEmailForBody.toLowerCase(); // Short Email

        // Encrypt Password
        const RandomRounds = new methods.UniqueGenerator(1).RandomNumber(false, [1, 2, 3, 4, 5]);
        const EncryptedPassword = await EncryptPassword(NewPassword, RandomRounds);

       /* This code block is updating the password of a client account in the database. It uses the
       `findOneAndUpdate` method of the `ClientAccountModel` to find a client account with the
       provided `User_id` and `Email` in the request body and update its `Password` field with the
       encrypted password generated using the `EncryptPassword` function. The `{new: true}` option
       is used to return the updated document instead of the original document. The updated client
       account object is then stored in the `Client` variable. */

        // Update Password
        const Client : globe = await ClientAccountModel.findOneAndUpdate({User_id: User_idForBody, Email: ShortEmail}, {Password: EncryptedPassword}, {new: true});

/* This code block is checking if the password reset operation was successful or not. It checks if the
`Client` object returned from the database has the same `User_id` and `Email` as provided in the
request body. If it does, it returns a success response with status code `200` and a message
"Password Reset Successfully". If the `Client` object does not match the provided credentials, it
returns a failure response with status code `400` and a message "Password Reset Failed due to
Invalid Credentials". */
        if(Client.User_id === User_idForBody && Client.Email === ShortEmail){
            return Response({
                res,
                StatusCode: StatusCodes.OK,
                Status: "OK",
                Message: "Password Reset Successfully",
                Data: Object(null)
            })
        } // If Block
        else{
            return Response({
                res,
                StatusCode: StatusCodes.BAD_REQUEST,
                Status: "Bad Request",
                Message: "Password Reset Failed due to Invalid Credentials",
                Data: Object(null)
            })
        };
    }
    catch(err){
        return Response({
            res,
            StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Status: "Internal Server Error",
            Message: "Internal Server Error Occurred while Resetting Password",
            Data: Object(null)
        })
    } // Try-Catch Block
} // Reset Password