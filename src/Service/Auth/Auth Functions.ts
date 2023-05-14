// This File used To Create Account, Login, and Update Account

// Import Essential Modules
/* The `import { Failed_Response, Success_Response } from '../../helper/API Response';` statement is
importing the `Failed_Response` and `Success_Response` functions from the `API Response` module
located in the `../../helper/` directory. These functions are likely used to send standardized API
responses with a specific format and status code. */
import { Failed_Response, Success_Response } from '../../helper/API Response'; // Import API Response Function

// import All Sub Middlewares & Functions
/* These lines of code are importing functions from two different middleware modules. */
import { GenerateID } from '../../Middleware/Auth/Generate User ID'; // Import Generate ID Function
import { EncryptPassword, ComparePassword } from '../../Middleware/Security/Bcrypt'; // Import Encrypt Password Function

// IMPORT Models for Database Operations
/* The `import { ClientAccountModel, StoreManagementModel } from '../../Models/index';` statement is
importing the `ClientAccountModel` and `StoreManagementModel` models from the `index.ts` file
located in the `../../Models/` directory. These models are likely used to interact with the database
and perform CRUD operations on the `ClientAccount` and `StoreManagement` collections. */
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Import Client Account Model

/* The `CreateAccountInterface` interface is defining the structure of the data expected in the request
body for the `CreateAccount` function. It specifies that the request body should contain fields such
as `Name`, `Email`, `Password`, `Phone`, `Address`, `City`, `State`, `Zip`, `Country`,
`SecurityQuestion`, `SecurityAnswer`, `isTermsAccepted`, `ShopName`, `ShopAddress`, `isGSTIN`,
`GSTIN`, and `PAN`. This helps with type checking and ensures that the correct data is being passed
to the function. */
// INTERFACES
interface CreateAccountInterface {
    Name: string;
    Email: string;
    Password: string;
    Phone: Number;
    Address: string;
    City: string;
    State: string;
    Zip: Number;
    Country: string;
    SecurityQuestion: string;
    SecurityAnswer: string;
    isTermsAccepted: Boolean;
    ShopName: string;
    ShopAddress: string;
    isGSTIN: Boolean;
    GSTIN: string;
    PAN: string;
}

// Function to Create Account{"$or"}
/**
 * This function creates a new user account and saves the data in the database.
 * @param {any} req - The request object containing information about the incoming HTTP request.
 * @param {any} res - The "res" parameter is the response object that will be sent back to the client
 * after the function is executed. It contains information such as the status code, message, and data
 * that will be returned to the client.
 */
export async function CreateAccount(req: any, res: any) {
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
    }: CreateAccountInterface = req.body; // Get Name from Request Body
    try {
        // Generate ID
      /* `let ID: number = await GenerateID();` is calling the `GenerateID()` function from the `Auth`
      middleware module to generate a unique user ID for the new account being created. The `await`
      keyword is used to wait for the function to complete before assigning the generated ID to the
      `ID` variable. The `ID` variable is then used to set the `User_id` field in the `AccountData`
      object, which is later saved to the database. */
        let ID: number = await GenerateID(); // Generate ID

        // Encrypt Password
        /* `let EncrypedPassword = await EncryptPassword(Password);` is calling the `EncryptPassword`
        function from the `Bcrypt` middleware module to encrypt the user's password before it is
        saved to the database. The `await` keyword is used to wait for the function to complete
        before assigning the encrypted password to the `EncrypedPassword` variable. This helps to
        ensure that the user's password is securely stored in the database and cannot be easily
        accessed by unauthorized users. */
        let EncrypedPassword = await EncryptPassword(Password); // Encrypt Password

        // Convert to Lower Case
        /* These lines of code are converting the `SecurityAnswer` and `Email` strings to lowercase
        using the `toLowerCase()` method. This is done to ensure that the data is consistent and to
        avoid any issues with case sensitivity when searching or comparing the data later on. */
        let SecurityAnswerShorted: string = SecurityAnswer.toLowerCase(); // Convert Security Answer to Lower Case
        let Shortedemail: string = Email.toLowerCase(); // Convert Email to Lower Case

        /* The above code is preparing data to be saved in a database. It creates an object called
        `AccountData` with various properties such as `User_id`, `Name`, `Email`, `Password`,
        `Phone`, `Address`, `City`, `State`, `Zip`, `Country`, `SecurityQuestion`, `SecurityAnswer`,
        `isTermsAccepted`, `ShopName`, `ShopAddress`, `isGSTIN`, `GSTIN`, and `PAN`. These
        properties contain the relevant information about a user's account, such as their personal
        details, shop information, and security information. This data */
        // pripare Data to be saved in Database
        let AccountData = {
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
        let StoreData = {
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
        if (Result != null && StoreResult != null) {
            // Check if Result is not undefined
            Success_Response({
                res: res,
                Status: 'Success',
                Message: 'Account Created Successfully ! Please Login to Continue with your Account !',
                Data: AccountData,
            }); // Send Response
        } else {
            Failed_Response({
                res: res,
                Status: 'Failed',
                Message: 'Account Creation Failed due to some internal server error !',
                Data: { Application_ID: ID },
            }); // Send Response
        }
    } catch (err) {
        console.log(err);
        Failed_Response({
            res: res,
            Status: 'Failed',
            Message: 'Account Creation Failed due to some internal server error !',
            Data: {},
        }); // Send Response
    }
}

//interface for login
/* The `interface Login` is defining the structure of the data expected in the request body for the
`LoginAccount` function. It specifies that the request body should contain an `Email` field of type
`string`, a `Password` field of type `string`, and a `RememberMe` field of type `boolean`. This
helps with type checking and ensures that the correct data is being passed to the function. */
interface Login {
    Email: string;
    Password: string;
    RememberMe: boolean;
}

// Login Account Function
/**
 * This TypeScript function handles the login process for a client account by verifying the email and
 * password, and sending a response based on the result.
 * @param {any} req - req is the request object that contains information about the incoming HTTP
 * request, such as the request headers, request parameters, and request body. It is used to retrieve
 * data from the client and pass it to the server for processing.
 * @param {any} res - The "res" parameter is the response object that will be sent back to the client
 * after the function is executed. It contains information such as the status code, message, and data
 * that will be returned to the client.
 */
export async function LoginAccount(req: any, res: any) {
   /* The above code is written in TypeScript and it is a part of a function that handles a login
   request. It is getting the data from the request body, specifically the email, password, and
   remember me fields. It then converts the email to lowercase and assigns the password to a
   variable called ClientPassword. This is likely done to ensure consistency in the data and to make
   it easier to compare with other data in the system. */
    let { Email, Password, RememberMe }: Login = req.body; // get data from request body
    let ClientPassword: string = Password; // get password from request body
    // converting all data to lower case
    let Shortedemail: string = Email.toLowerCase(); // Convert Email to Lower Case

    try {
      /* The above code is using TypeScript to find an account in a database based on a specified email
      address. It is using the `ClientAccountModel` to search for an account with an email that
      matches the `Shortedemail` variable. The result of the search is stored in the
      `Find_Account_Result` variable. */
        // Find Account if exist with same Email or Phone in typescript
        let Find_Account_Result: any = await ClientAccountModel.find({
            Email: Shortedemail,
        }); // Find Account

      /* The above code is written in TypeScript and it is destructuring the `Password` property from
      the first element of the `Find_Account_Result` array. The `Find_Account_Result` array is
      assumed to contain objects with a `Password` property. The destructured `Password` value is
      then assigned to the `Password` variable using object destructuring syntax. */
        // destructure data from Find_Account_Result
        let { Password }: any = Find_Account_Result[0]; // Destructure Password from Find_Account_Result

        /* The code is calling a function named `ComparePassword` and passing two parameters to it:
        `ClientPassword` and `Password`. It then awaits the result of this function and assigns it
        to a variable named `Password_Verification_Result`. The purpose of the function is to
        compare the two passwords and return a result indicating whether they match or not. */
        // Sending Client Password to ComparePassword Function
        let Password_Verification_Result: any = await ComparePassword(ClientPassword, Password); // Compare Password

       /* The above code is a TypeScript function that sends a response to a login request. It checks
       if the password provided by the user matches the password stored in the database. If the
       password matches, it sends a success response with the account details and a flag indicating
       whether to save the details locally or not. If the password does not match, it sends a failed
       response with an error message. The response is sent using two helper functions,
       Success_Response and Failed_Response. */
        // logic for sending response
        if (Password_Verification_Result === true) {
            if (RememberMe === true) {
                Success_Response({
                    res: res,
                    Status: 'Success',
                    Message: 'Login Successful !',
                    Data: {
                        AccountDetails: Find_Account_Result[0], // Send Account Details
                        SaveLocally: true, // Send Save Locally
                    },
                }); // Send Response
            } else if (RememberMe === false) {
                Success_Response({
                    res: res,
                    Status: 'Success',
                    Message: 'Login Successful !',
                    Data: {
                        AccountDetails: Find_Account_Result[0], // Send Account Details
                        SaveLocally: false, // Send Save Locally
                    },
                }); // Send Response
            }
        } else if (Password_Verification_Result === false) {
            Failed_Response({
                res: res,
                Status: 'Failed',
                Message: 'Password is Incorrect !',
                Data: {},
            }); // Send Response
        }
    } catch (error) {
        throw error;
    }
}
