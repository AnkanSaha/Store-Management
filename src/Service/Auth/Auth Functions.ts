// This File used To Create Account, Login, and Update Account

// Import Essential Modules
import { randomNumber } from 'uniquegen'; // Import Unique ID Generator
/* The `import { Failed_Response, Success_Response } from '../../helper/API Response';` statement is
importing the `Failed_Response` and `Success_Response` functions from the `API Response` module
located in the `../../helper/` directory. These functions are likely used to send standardized API
responses with a specific format and status code. */
import { Response } from '../../helper/API Response'; // Import API Response Function
import { ResponseCode } from '../../config/App Config/General Config'; // Import Response Code

// import All Sub Middlewares & Functions
/* These lines of code are importing functions from two different middleware modules. */
import { EncryptPassword, ComparePassword } from '../../Middleware/Security/Bcrypt'; // Import Encrypt Password Function
import {GenerateJWTtoken} from '../../Middleware/Security/JWT Token Generator'; // Import JWT Token Generator Function

// IMPORT Models for Database Operations
/* The `import { ClientAccountModel, StoreManagementModel } from '../../Models/index';` statement is
importing the `ClientAccountModel` and `StoreManagementModel` models from the `index.ts` file
located in the `../../Models/` directory. These models are likely used to interact with the database
and perform CRUD operations on the `ClientAccount` and `StoreManagement` collections. */
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Import Client Account Model

// global types
type str = string; // type for string
type num = number; // type for number
type obj = object; // type for object
type globe = any; // type for any
type blank = void; // type for void
type bool = boolean; // type for boolean

/* The `CreateAccountInterface` interface is defining the structure of the data expected in the request
body for the `CreateAccount` function. It specifies that the request body should contain fields such
as `Name`, `Email`, `Password`, `Phone`, `Address`, `City`, `State`, `Zip`, `Country`,
`SecurityQuestion`, `SecurityAnswer`, `isTermsAccepted`, `ShopName`, `ShopAddress`, `isGSTIN`,
`GSTIN`, and `PAN`. This helps with type checking and ensures that the correct data is being passed
to the function. */
// Global INTERFACES

// global interface
interface AccountInterface {
    Name: str;
    Email: str;
    Password: str;
    Phone: num;
    Address: str;
    City: str;
    State: str;
    Zip: num;
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
    User_id: num;
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
    /* This code is destructuring the properties from the `req.body` object and assigning them to
   variables with the same names as the properties. The `CreateAccountInterface` interface is used
   to define the expected structure of the `req.body` object, ensuring that the correct data is
   being passed to the function. This allows the function to access the data from the request body
   more easily and use it to create a new user account. */
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
        let RoundNumber: num = await randomNumber(1, false); // Generate Round Number for Encryption Password and ID
        let ID: num = await randomNumber(RoundNumber, true); // Generate ID

        /* The above code is written in TypeScript and it is declaring two variables `RoundNumber` and
`EncryptedPassword`. 
The `RoundNumber` variable is assigned the value returned by the `randomNumber` function, which
is awaited. The `randomNumber` function is likely a custom function that generates a random number*/
        let EncrypedPassword: str = await EncryptPassword(Password, RoundNumber); // Encrypt Password

        // Convert to Lower Case
        /* These lines of code are converting the `SecurityAnswer` and `Email` strings to lowercase
        using the `toLowerCase()` method. This is done to ensure that the data is consistent and to
        avoid any issues with case sensitivity when searching or comparing the data later on. */
        let SecurityAnswerShorted: str = SecurityAnswer.toLowerCase(); // Convert Security Answer to Lower Case
        let Shortedemail: str = Email.toLowerCase(); // Convert Email to Lower Case

        /* The above code is preparing data to be saved in a database. It creates an object called
        `AccountData` with various properties such as `User_id`, `Name`, `Email`, `Password`,
        `Phone`, `Address`, `City`, `State`, `Zip`, `Country`, `SecurityQuestion`, `SecurityAnswer`,
        `isTermsAccepted`, `ShopName`, `ShopAddress`, `isGSTIN`, `GSTIN`, and `PAN`. These
        properties contain the relevant information about a user's account, such as their personal
        details, shop information, and security information. This data */
        // pripare Data to be saved in Database
        let AccountData: RegisterAccountData = {
            User_id: ID,
            Name: Name,
            Email: Shortedemail,
            Password: EncrypedPassword,
            Phone: Phone,
            Address: Address,
            City: City,
            State: State,
            Zip: Zip,
            Country: Country,
            SecurityQuestion: SecurityQuestion,
            SecurityAnswer: SecurityAnswerShorted,
            isTermsAccepted: isTermsAccepted,
            ShopName: ShopName,
            ShopAddress: ShopAddress,
            isGSTIN: isGSTIN,
            GSTIN: GSTIN,
            PAN: PAN,
        };

        /* The above code is creating an object named `StoreData` which contains information related to
       a store. It includes the user ID, email, store name, and empty arrays for employees,
       products, customers, orders, suppliers, and categories. This code is likely part of a larger
       program for managing a store's data. */
        // Create New Document for Store Management
        let StoreData: obj = {
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

        /* The above code is creating two new instances of different models: `ClientAccountModel` and
       `StoreManagementModel`. The `ClientAccountModel` instance is being initialized with the
       `AccountData` parameter, while the `StoreManagementModel` instance is being initialized with
       the `StoreData` parameter. These models are likely part of a larger TypeScript application
       and are being used to manage data related to client accounts and store management. */
        let FinalData = new ClientAccountModel(AccountData); // Create New Document
        let StoreManagement = new StoreManagementModel(StoreData); // Create New Document

        /* The above code is using the `await` keyword to asynchronously save two documents (`FinalData`
       and `StoreManagement`) in a TypeScript program. The results of the save operations are stored
       in the `Result` and `StoreResult` variables respectively. */
        // Save Document
        let Result = await FinalData.save(); // Save Document
        let StoreResult = await StoreManagement.save(); // Save Document

        /* The above code is creating an account and sending a response to the client. It first removes
     the password from the account data, then checks if the result and store result are not null. If
     they are not null, it sends a success response with a status code of 200 and a message
     indicating that the account was created successfully. The account data is included in the
     response. If the result or store result is null, it sends a failed response with a status code
     of 400 and a message indicating that the account creation failed due to an internal server
     error. The application ID is included in the response */
        AccountData.Password = 'Encrypted with Crypto'; // Remove Password from Response
        const JWT_Signed_Data_For_Account_Create: str = await GenerateJWTtoken(AccountData); // Generate JWT Token
        AccountData.JWT_Token = JWT_Signed_Data_For_Account_Create; // Add JWT Token to Response
        if (Result != null && StoreResult != null) {
            // Check if Result is not undefined
            Response({
                res: res,
                Status: 'Success',
                StatusCode: ResponseCode.OK,
                Message: 'Account Created Successfully ! Please Login to Continue with your Account !',
                Data:AccountData
            }); // Send Response
        } else {
            Response({
                res: res,
                Status: 'Failed',
                StatusCode: ResponseCode.Forbidden,
                Message: 'Account Creation Failed due to some internal server error !',
                Data: { Application_ID: ID },
            }); // Send Response
        }
    } catch (err) {
        console.log(err);
        Response({
            res: res,
            Status: 'Failed',
            StatusCode: ResponseCode.Internal_Server_Error,
            Message: 'Account Creation Failed due to some internal server error !',
            Data: undefined,
        }); // Send Response
    }
}

//interface for login
/* The `interface Login` is defining the structure of the data expected in the request body for the
`LoginAccount` function. It specifies that the request body should contain an `Email` field of type
`string`, a `Password` field of type `string`, and a `RememberMe` field of type `boolean`. This
helps with type checking and ensures that the correct data is being passed to the function. */

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
    /* The above code is written in TypeScript and it is a part of a function that handles a login
   request. It is getting the data from the request body, specifically the email, password, and
   remember me fields. It then converts the email to lowercase and assigns the password to a
   variable called ClientPassword. This is likely done to ensure consistency in the data and to make
   it easier to compare with other data in the system. */
    let { Email, Password, RememberMe } = req.body; // get data from request body
    let ClientPassword: str = Password; // get password from request body
    // converting all data to lower case
    let Shortedemail: str = Email.toLowerCase(); // Convert Email to Lower Case

    try {
        /* The above code is using TypeScript to find an account in a database based on a specified email
      address. It is using the `ClientAccountModel` to search for an account with an email that
      matches the `Shortedemail` variable. The result of the search is stored in the
      `Find_Account_Result` variable. */
        // Find Account if exist with same Email or Phone in typescript
        let Find_Account_Result: obj | globe = await ClientAccountModel.find({
            Email: Shortedemail,
        }); // Find Account

        /* The above code is written in TypeScript and it is destructuring the `Password` property from
      the first element of the `Find_Account_Result` array. The `Find_Account_Result` array is
      assumed to contain objects with a `Password` property. The destructured `Password` value is
      then assigned to the `Password` variable using object destructuring syntax. */
        // destructure data from Find_Account_Result
        let { Password }: obj | globe = Find_Account_Result[0]; // Destructure Password from Find_Account_Result

        /* The code is calling a function named `ComparePassword` and passing two parameters to it:
        `ClientPassword` and `Password`. It then awaits the result of this function and assigns it
        to a variable named `Password_Verification_Result`. The purpose of the function is to
        compare the two passwords and return a result indicating whether they match or not. */
        // Sending Client Password to ComparePassword Function
        let Password_Verification_Result: bool = await ComparePassword(ClientPassword, Password); // Compare PasswordAccountDetails:
        Find_Account_Result[0].Password = 'Encrypted with Crypto'; // Remove Password from Response
        /* The above code is a TypeScript function that sends a response to a login request. It checks
       if the password provided by the user matches the password stored in the database. If the
       password matches, it sends a success response with the account details and a flag indicating
       whether to save the details locally or not. If the password does not match, it sends a failed
       response with an error message. The response is sent using two helper functions,
       Success_Response and Failed_Response. */
        // logic for sending response
        const JWT_Signed_Data_For_Login = await GenerateJWTtoken(Find_Account_Result[0])
        if (Password_Verification_Result === true) {
            if (RememberMe === true) {
                Response({
                    res: res,
                    Status: 'Success',
                    StatusCode: ResponseCode.OK,
                    Message: 'Login Successful !',
                    Data: {
                        AccountDetails:JWT_Signed_Data_For_Login, // Send Account Details
                        SaveLocally: true, // Send Save Locally
                    },
                }); // Send Response
            } else if (RememberMe === false) {
                Response({
                    res: res,
                    Status: 'Success',
                    StatusCode: ResponseCode.OK,
                    Message: 'Login Successful !',
                    Data: {
                        AccountDetails: JWT_Signed_Data_For_Login, // Send Account Details
                        SaveLocally: false, // Send Save Locally
                    },
                }); // Send Response
            }
        } else if (Password_Verification_Result === false) {
            Response({
                res: res,
                Status: 'Failed',
                StatusCode: ResponseCode.Unauthorized,
                Message: 'Password is Incorrect !',
                Data: undefined,
            }); // Send Response
        }
    } catch (error) {
        throw error;
    }
}
