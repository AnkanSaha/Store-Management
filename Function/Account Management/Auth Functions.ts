// This File used To Create Account, Login, and Update Account

// Import Essential Modules

// import All Sub Middlewares & Functions
import { GenerateID } from "../../Middleware/Auth/Generate User ID"; // Import Generate ID Function

// IMPORT Models for Database Operations
import { ClientAccountModel } from "../../Database/Model/Client Account Model"; // Import Client Account Model

// Function to Create Account
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
  console.log(Result); // Log Result
  if (Result != null) {
    // Check if Result is not undefined
    res
      .status(200)
      .json({
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
