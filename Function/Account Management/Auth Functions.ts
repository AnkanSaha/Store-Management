// This File used To Create Account, Login, and Update Account

// Import Essential Modules

// import All Sub Middlewares & Functions
import { GenerateID } from "../../Middleware/Auth/Generate User ID"; // Import Generate ID Function
import { EncryptPassword } from "../../Middleware/Security/Bcrypt"; // Import Encrypt Password Function

// IMPORT Models for Database Operations
import { ClientAccountModel } from "../../Database/Model/Client Account Model"; // Import Client Account Model

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
  isTermsAccepted: Boolean,
  ShopName: string,
  ShopAddress: string,
  isGSTIN: Boolean,
  GSTIN: string,
  PAN: string,
  res: any
) {
  // Generate ID
  let ID = await GenerateID(); // Generate ID

  // Encrypt Password
  let EncrypedPassword = await EncryptPassword(Password); // Encrypt Password

  // Find Account if exist with same Email or Phone in typescript
  let Temporary_Find_Result: any = await ClientAccountModel.find({
    $or: [{ Email: Email }, { Phone: Phone }]
  }); // Find Account

  if (Temporary_Find_Result.length > 0) {
    // Check if Account Exist
    res
      .status(400)
      .json({
        Status: "Failed",
        Message: "Account Already Exist",
        Application_ID: ID,
      }); // Send Response
    return; // Return
  } else if (Temporary_Find_Result.length == 0) {
    // pripare Data to be saved in Database
    let Data = {
      User_id: ID,
      Name: Name,
      Email: Email,
      Password: EncrypedPassword,
      Phone: Phone,
      Address: Address,
      City: City,
      State: State,
      Zip: Zip,
      Country: Country,
      isTermsAccepted: isTermsAccepted,
      ShopName: ShopName,
      ShopAddress: ShopAddress,
      isGSTIN: isGSTIN,
      GSTIN: GSTIN,
      PAN: PAN,
    };

    let FinalData = new ClientAccountModel(Data); // Create New Document
    let Result = await FinalData.save(); // Save Document
    Data.Password = "Encrypted"; // Remove Password from Response
    if (Result != null) {
      // Check if Result is not undefined
      res.status(200).json({
        Status: "Success",
        Message: "Account Created Successfully",
        Data: Data
      }); // Send Response
    } else {
      res
        .status(400)
        .json({ Status: "Failed", Message: "Account Creation Failed" }); // Send Response
    }
  }
}
