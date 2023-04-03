// Import Essential Modules
import { Router, json } from "express"; // import Router Module
import cors from "cors"; // import Cors Module
// Invoke Router
export const Authenticate = Router(); // Create Router Instance

// using Cors
Authenticate.use(cors({ origin: "*" })); // Allow All Origin

// Import Controllers

// All Routes that can handle requests
Authenticate.post('/CreateAccount', json(), (req, res) => {
    const {Name} : {Name:string} = req.body
    console.log(Name)
}); // Create Account Route