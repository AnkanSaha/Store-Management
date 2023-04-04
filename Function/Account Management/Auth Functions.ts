// This File used To Create Account, Login, and Update Account

// Import Essential Modules

// import All Sub Middlewares & Functions
import { GenerateID } from "../../Middleware/Auth/Generate User ID"; // Import Generate ID Function

// IMPORT Models for Database Operations
import { ClientAccountModel } from "../../Database/Model/Client Account Model"; // Import Client Account Model

// Function to Create Account{"$or"}
export async function CreateAccount(
  Name: string,
  Email: String,
  Password: String,
  Phone: Number,
  Address: String,
  City: String,
  State: String,
  Zip: Number,
  Country: String,
  isTermsAccepted: Boolean,
  ShopName: String,
  ShopAddress: String,
  isGSTIN: Boolean,
  GSTIN: String,
  PAN: String,
  res: any
) {
  // Generate ID
  let ID = await GenerateID(); // Generate ID

  // Find Account if exist with same Email or Phone in typescript
  let Temporary_Find_Result: any = await ClientAccountModel.find({
    $or: [{ Email: Email }, { Phone: Phone }],
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
    let Data: Object = {
      User_id: ID,
      Name: Name,
      Email: Email,
      Password: Password,
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
    if (Result != null) {
      // Check if Result is not undefined
      res.status(200).json({
        Status: "Success",
        Message: "Account Created Successfully",
        Data: Result,
      }); // Send Response
    } else {
      res
        .status(400)
        .json({ Status: "Failed", Message: "Account Creation Failed" }); // Send Response
    }
  }
}
