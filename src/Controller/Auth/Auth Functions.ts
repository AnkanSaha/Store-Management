// This File used To Create Account, Login, and Update Account

// Import Essential Modules
import { Failed_Response, Success_Response } from '../../helper/API Response'; // Import API Response Function

// import All Sub Middlewares & Functions
import { GenerateID } from '../../Middleware/Auth/Generate User ID'; // Import Generate ID Function
import { EncryptPassword, ComparePassword } from '../../Middleware/Security/Bcrypt'; // Import Encrypt Password Function

// IMPORT Models for Database Operations
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Import Client Account Model

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
export async function CreateAccount(req: any, res: any) {
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
    }: CreateAccountInterface = req.body; // Get Name from Request Body
    try {
        // Generate ID
        let ID: number = await GenerateID(); // Generate ID

        // Encrypt Password
        let EncrypedPassword = await EncryptPassword(Password); // Encrypt Password

        // Convert to Lower Case
        let SecurityAnswerShorted: string = SecurityAnswer.toLowerCase(); // Convert Security Answer to Lower Case
        let Shortedemail: string = Email.toLowerCase(); // Convert Email to Lower Case

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

        let FinalData = new ClientAccountModel(AccountData); // Create New Document
        let StoreManagement = new StoreManagementModel(StoreData); // Create New Document

        // Save Document
        let Result = await FinalData.save(); // Save Document
        let StoreResult = await StoreManagement.save(); // Save Document

        AccountData.Password = 'Encrypted with Crypto'; // Remove Password from Response
        if (Result != null && StoreResult != null) {
            // Check if Result is not undefined
            Success_Response({
                res: res,
                Status: 'Success',
                StatusCode: 200,
                Message: 'Account Created Successfully ! Please Login to Continue with your Account !',
                Data: AccountData,
            }); // Send Response
        } else {
            Failed_Response({
                res: res,
                Status: 'Failed',
                StatusCode: 400,
                Message: 'Account Creation Failed due to some internal server error !',
                Data: { Application_ID: ID },
            }); // Send Response
        }
    } catch (err) {
        Failed_Response({
            res: res,
            Status: 'Failed',
            StatusCode: 400,
            Message: 'Account Creation Failed due to some internal server error !',
            Data: {},
        }); // Send Response
    }
}

//interface for login
interface Login {
    Email: string;
    Password: string;
    RememberMe: boolean;
}

// Login Account Function
export async function LoginAccount(req: any, res: any) {
    let { Email, Password, RememberMe }: Login = req.body; // get data from request body
    let ClientPassword: string = Password; // get password from request body
    // converting all data to lower case
    let Shortedemail: string = Email.toLowerCase(); // Convert Email to Lower Case

    try {
        // Find Account if exist with same Email or Phone in typescript
        let Find_Account_Result: any = await ClientAccountModel.find({
            Email: Shortedemail,
        }); // Find Account

        // destructure data from Find_Account_Result
        let { Password }: any = Find_Account_Result[0]; // Destructure Password from Find_Account_Result

        // Sending Client Password to ComparePassword Function
        let Password_Verification_Result: any = await ComparePassword(ClientPassword, Password); // Compare Password

        // logic for sending response
        if (Password_Verification_Result === true) {
            if (RememberMe === true) {
                Success_Response({
                    res: res,
                    Status: 'Success',
                    StatusCode: 200,
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
                    StatusCode: 200,
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
                StatusCode: 400,
                Message: 'Password is Incorrect !',
                Data: {},
            }); // Send Response
        }
    } catch (error) {
        throw error;
    }
}
