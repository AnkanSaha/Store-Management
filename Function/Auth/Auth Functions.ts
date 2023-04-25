// This File used To Create Account, Login, and Update Account

// Import Essential Modules

// import All Sub Middlewares & Functions
import { GenerateID } from "../../Middleware/Auth/Generate User ID"; // Import Generate ID Function
import {
  EncryptPassword,
  ComparePassword,
} from "../../Middleware/Security/Bcrypt"; // Import Encrypt Password Function

// IMPORT Models for Database Operations
import { ClientAccountModel } from "../../Database/Model/Client Account Model"; // Import Client Account Model
import { StoreManagementModel } from "../../Database/Model/Store Management Model"; // Import Store Management Model

// Function to Create Account{"$or"}
export async function CreateAccount(
  Name: string,
  Email: String,
  Password: string,
  Phone: Number,
  Address: string,
  City: string,
  State: string,
  Zip: Number,
  Country: string,
  SecurityQuestion: string,
  SecurityAnswer: string,
  isTermsAccepted: Boolean,
  ShopName: string,
  ShopAddress: string,
  isGSTIN: Boolean,
  GSTIN: string,
  PAN: string,
  res: any
) {
  // Generate ID
  let ID: number = await GenerateID(); // Generate ID

  // Encrypt Password
  let EncrypedPassword = await EncryptPassword(Password); // Encrypt Password

  // Convert to Lower Case
  let SecurityAnswerShorted: string = SecurityAnswer.toLowerCase(); // Convert Security Answer to Lower Case
  let Shortedemail: string = Email.toLowerCase(); // Convert Email to Lower Case

  // Find Account if exist with same Email or Phone in typescript
  let Temporary_Find_Result: any = await ClientAccountModel.find({
    $or: [{ Email: Shortedemail }, { Phone: Phone }, { PAN: PAN }],
  }); // Find Account
  // Check if Store Exist
  let StoreExist: any = await StoreManagementModel.find({
    $or: [{ User_id: ID }, { Email: Shortedemail }],
  }); // Find Store

  if (Temporary_Find_Result.length > 0 || StoreExist.length > 0) {
    // Check if Account Exist
    res.status(400).json({
      Status: "Exist",
      Message:
        "Account Already Exist with this Email or Phone Number ! please Login or Reset Password !",
      Application_ID: ID,
    }); // Send Response
    return; // Return
  } else if (Temporary_Find_Result.length == 0 || StoreExist.length == 0) {

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
      Catagories: []
    }

    let FinalData = new ClientAccountModel(AccountData); // Create New Document
    let StoreManagement = new StoreManagementModel(StoreData); // Create New Document

    // Save Document
    let Result = await FinalData.save(); // Save Document
    let StoreResult = await StoreManagement.save(); // Save Document

    AccountData.Password = "Encrypted with Crypto"; // Remove Password from Response
    if (Result != null && StoreResult != null) {
      // Check if Result is not undefined
      res.status(200).json({
        Status: "Success",
        Message:
          "Account Created Successfully ! Please Login to Continue with your Account !",
        Data: AccountData,
      }); // Send Response
    } else {
      res.status(400).json({
        Status: "Failed",
        Message: "Account Creation Failed due to some internal server error !",
        Application_ID: ID,
      }); // Send Response
    }
  }
} // Create Account Function

//interface for data props

interface props {
  Email: string;
  ClientPassword: string;
  RememberMe: boolean;
  res: any;
}

// Login Account Function
export async function LoginAccount({
  Email,
  ClientPassword,
  RememberMe,
  res,
}: props) {
  // converting all data to lower case
  let Shortedemail: string = Email.toLowerCase(); // Convert Email to Lower Case

  try {
    // Find Account if exist with same Email or Phone in typescript
    let Find_Account_Result: any = await ClientAccountModel.find({
      Email: Shortedemail,
    }); // Find Account

    if (Find_Account_Result.length === 0) {
      res.status(404).json({
        Status: "Failed",
        Message: "Account Not Found ! Please Create Account !",
      }); // Send Not Found Response
    } else if (Find_Account_Result.length > 0) {
      // destructure data from Find_Account_Result
      let { Password }: any = Find_Account_Result[0]; // Destructure Password from Find_Account_Result

      // Sending Client Password to ComparePassword Function
      let Password_Verification_Result: any = await ComparePassword(
        ClientPassword,
        Password
      ); // Compare Password

      // logic for sending response
      if (Password_Verification_Result === true) {
        if (RememberMe === true) {
          res.status(200).json({
            Status: "Success",
            Message: "Login Successful !",
            AccountDetails: Find_Account_Result[0], // Send Account Details
            SaveLocally: true, // Send Save Locally
          }); // Send Response
        } else if (RememberMe === false) {
          res.status(200).json({
            Status: "Success",
            Message: "Login Successfull !",
            AccountDetails: Find_Account_Result[0],
            SaveLocally: false, // Send Save Locally
          }); // Send Response
        }
      } else if (Password_Verification_Result === false) {
        res.status(400).json({
          Status: "Failed",
          Message: "Password is Incorrect !",
        }); // Send Response
      }
    }
  } catch (error) {
    throw error;
  }
}
