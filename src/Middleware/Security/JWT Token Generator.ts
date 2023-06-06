/* This line of code is importing the `sign` function from the `jsonwebtoken` library in TypeScript.
The `sign` function is used to generate a JSON Web Token (JWT) with a given payload and secret key. */

import { sign, verify } from 'jsonwebtoken'; // Import JWT library
import { GeneralGlobalStringData } from '../../config/App Config/General Config'; // Import General Global String Data
// Global types
type str = string; // Define a type for strings
type globe = any; // Define a type for global variables

export async function GenerateJWTtoken(payload: globe): Promise<str | globe> {
    const Temp_Payload = JSON.stringify(payload); // Define a variable for payload
    const Signed_Token: str = sign(Temp_Payload, GeneralGlobalStringData.JWT_Secret); // Generate JWT Token
    return Signed_Token; // Return JWT Token
} // Generate JWT Token


export async function VerifyJWTtoken(token: str): Promise<globe> {
    const Verified_Token: globe = verify(token, GeneralGlobalStringData.JWT_Secret); // Verify JWT Token
    return Verified_Token; // Return Verified JWT Token
} // Verify JWT Token
