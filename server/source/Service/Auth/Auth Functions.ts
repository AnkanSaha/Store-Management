// This File used To Create Account, Login, and Update Account

// Import Essential Modules
import { ClassBased } from 'outers'; // Import Unique ID Generator

import { Response } from '../../helper/API Response'; // Import API Response Function
import { StatusCodes } from 'outers'; // Import Response Code

// import All Sub Middlewares & Functions
/* These lines of code are importing functions from two different middleware modules. */
import { EncryptPassword, ComparePassword } from '../../Middleware/Security/Bcrypt'; // Import Encrypt Password Function
import { GenerateJWTtoken } from '../../Middleware/Security/JWT/JWT Token Generator'; // Import JWT Token Generator Function

// IMPORT Models for Database Operations
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Import Client Account Model

// global types
type str = string; // type for string
type int = number; // type for number
type obj = object; // type for object
type globe = any; // type for any
type blank = void; // type for void
type bool = boolean; // type for boolean

// global interface
interface AccountInterface {
    Name: str;
    Email: str;
    Password: str;
    Phone: int;
    Address: str;
    City: str;
    State: str;
    Zip: int;
    Country: str;
    SecurityQuestion: str;
    SecurityAnswer: str;
    isTermsAccepted: bool;
    ShopName: str;
    ShopAddress: str;
    isGSTIN: bool;
    GSTIN: str;
    PAN: str;
    RememberMe?: bool;
}

interface RegisterAccountData extends AccountInterface {
    User_id: int;
    JWT_Token?: str;
}

// interface for Request & Response
interface RequestInterface {
    body: RegisterAccountData;
}

// Function to Create Account{"$or"}
/**
 * This function creates a new user account and saves the data in the database.
 * @param {RequestInterface} req - The request object containing information about the incoming HTTP request.
 * @param {globe} res - The "res" parameter is the response object that will be sent back to the client
 * after the function is executed. It contains information such as the status code, message, and data
 * that will be returned to the client.
 */
export async function CreateAccount(req: RequestInterface, res: obj | globe): Promise<blank> {
    // Get Data from Request Body
    const {
        Name,
        Email,
        Password,
        Phone,
        Address,
        City,
        State,
        Zip,
        Country,
        SecurityQuestion,
        SecurityAnswer,
        isTermsAccepted,
        ShopName,
        ShopAddress,
        isGSTIN,
        GSTIN,
        PAN,
    } = req.body; // Get Name from Request Body
    try {
        // Generate ID and Encrypt Password
        /* The above code is generating a random number to determine the length of the ID and the encryption
        round number. It then generates a random ID with the determined length. */

        const RoundNumber: int = new ClassBased.UniqueGenerator(1).RandomNumber(false, [1, 2, 3, 4, 5]); // Generate Round Number for Encryption Password and ID
        const ID: int = new ClassBased.UniqueGenerator(RoundNumber).RandomNumber(true);

        /* The above code is written in TypeScript and it is declaring two variables `RoundNumber` and
`EncryptedPassword`.
The `RoundNumber` variable is assigned the value returned by the `randomNumber` function, which
is awaited. The `randomNumber` function is likely a custom function that generates a random number*/
        const EncrypedPassword: str = await EncryptPassword(Password, RoundNumber); // Encrypt Password

        // Convert to Lower Case
        const SecurityAnswerShorted: str = SecurityAnswer.toLowerCase(); // Convert Security Answer to Lower Case
        const Shortedemail: str = Email.toLowerCase(); // Convert Email to Lower Case

        // prepare Data to be saved in Database
        const AccountData: RegisterAccountData = {
            User_id: ID,
            Name,
            Email: Shortedemail,
            Password: EncrypedPassword,
            Phone,
            Address,
            City,
            State,
            Zip,
            Country,
            SecurityQuestion,
            SecurityAnswer: SecurityAnswerShorted,
            isTermsAccepted,
            ShopName,
            ShopAddress,
            isGSTIN,
            GSTIN,
            PAN,
        };

        // Create New Document for Store Management
        const StoreData: obj = {
            StoreID: new ClassBased.UniqueGenerator(15).RandomNumber(true),
            User_id: ID,
            Email: Shortedemail,
            StoreName: ShopName,
            Employees: [],
            Products: [],
            Customers: [],
            Orders: [],
            Suppliers: [],
            Catagories: [],
        };

        const FinalData = new ClientAccountModel(AccountData); // Create New Document
        const StoreManagement = new StoreManagementModel(StoreData); // Create New Document

        // Save Document
        const Result = await FinalData.save(); // Save Document
        const StoreResult = await StoreManagement.save(); // Save Document

        AccountData.Password = 'Encrypted with Crypto'; // Remove Password from Response
        const JWTSignedDataForAccountCreate: str = await GenerateJWTtoken(AccountData); // Generate JWT Token
        if (Result != null && StoreResult != null) {
            // Check if Result is not undefined
            Response({
                res,
                Status: 'Success',
                StatusCode: StatusCodes.OK,
                Message: 'Account Created Successfully ! Please Login to Continue with your Account !',
                Data: Object(JWTSignedDataForAccountCreate),
            }); // Send Response
        } else {
            Response({
                res,
                Status: 'Failed',
                StatusCode: StatusCodes.FORBIDDEN,
                Message: 'Account Creation Failed due to some internal server error !',
                Data: { Application_ID: ID },
            }); // Send Response
        }
    } catch (err) {
        Response({
            res,
            Status: 'Failed',
            StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Message: 'Account Creation Failed due to some internal server error !',
            Data: undefined,
        }); // Send Response
    }
}

// interface for login

// Login Account Function
/**
 * This TypeScript function handles the login process for a client account by verifying the email and
 * password, and sending a response based on the result.
 * @param {globe} req - req is the request object that contains information about the incoming HTTP
 * request, such as the request headers, request parameters, and request body. It is used to retrieve
 * data from the client and pass it to the server for processing.
 * @param {globe} res - The "res" parameter is the response object that will be sent back to the client
 * after the function is executed. It contains information such as the status code, message, and data
 * that will be returned to the client.
 */
export async function LoginAccount(req: RequestInterface, res: obj | globe): Promise<blank> {
    const { Email, RememberMe } = req.body; // get data from request body
    const ClientPassword: str = req.body.Password; // get password from request body
    // converting all data to lower case
    const Shortedemail: str = Email.toLowerCase(); // Convert Email to Lower Case

    try {
        // Find Account if exist with same Email or Phone in typescript
        const FindAccountResult: obj | globe = await ClientAccountModel.find({
            Email: Shortedemail,
        }); // Find Account

        // destructure data from Find_Account_Result
        const { Password }: obj | globe = FindAccountResult[0]; // Destructure Password from Find_Account_Result

        // Sending Client Password to ComparePassword Function
        const PasswordVerificationResult: bool = await ComparePassword(ClientPassword, Password); // Compare PasswordAccountDetails:
        FindAccountResult[0].Password = 'Encrypted with Crypto'; // Remove Password from Response

        // logic for sending response
        const JWTSignedDataForLogin = await GenerateJWTtoken(FindAccountResult[0]);
        if (PasswordVerificationResult === true) {
            if (RememberMe === true) {
                Response({
                    res,
                    Status: 'Success',
                    StatusCode: StatusCodes.OK,
                    Message: 'Login Successful !',
                    Data: {
                        AccountDetails: JWTSignedDataForLogin, // Send Account Details
                        SaveLocally: true, // Send Save Locally
                    },
                }); // Send Response
            } else if (RememberMe === false) {
                Response({
                    res,
                    Status: 'Success',
                    StatusCode: StatusCodes.OK,
                    Message: 'Login Successful !',
                    Data: {
                        AccountDetails: JWTSignedDataForLogin, // Send Account Details
                        SaveLocally: false, // Send Save Locally
                    },
                }); // Send Response
            }
        } else if (PasswordVerificationResult === false) {
            Response({
                res,
                Status: 'Failed',
                StatusCode: StatusCodes.UNAUTHORIZED,
                Message: 'Password is Incorrect !',
                Data: {},
            }); // Send Response
        }
    } catch (error) {
        throw error; // Throw a error
    }
}
