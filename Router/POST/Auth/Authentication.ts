// Import Essential Modules
import { Router, json } from "express"; // import Router Module
import cors from "cors"; // import Cors Module
// Invoke Router
export const Authenticate = Router(); // Create Router Instance

// using Cors
Authenticate.use(cors({ origin: "*" })); // Allow All Origin

// Import Controllers
import { CreateAccount } from "../../../Function/Account Management/Auth Functions"; // Import Create Account Function

// All Routes that can handle requests
Authenticate.post("/CreateAccount", json(), (req, res) => {
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
    isTermsAccepted,
    ShopName,
    ShopAddress,
    isGSTIN,
    GSTIN,
    PAN,
  }: {
    Name: string;
    Email: string;
    Password: string;
    Phone: Number;
    Address: string;
    City: string;
    State: string;
    Zip: Number;
    Country: string;
    isTermsAccepted: Boolean;
    ShopName: string;
    ShopAddress: string;
    isGSTIN: Boolean;
    GSTIN: string;
    PAN: string;
  } = req.body; // Get Name from Request Body

  // Passing Data to Create Account Function
  CreateAccount(
    Name,
    Email,
    Password,
    Phone,
    Address,
    City,
    State,
    Zip,
    Country,
    isTermsAccepted,
    ShopName,
    ShopAddress,
    isGSTIN,
    GSTIN,
    PAN,
    res
  ); // Create Account
}); // Create Account Route
