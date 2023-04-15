// This File is used for encrypting the password and comparing the password

// import required modules
import { genSalt, hash } from "bcrypt"; // import Bcrypt

// import Variables

// Function to Encrypt Password
export async function EncryptPassword(Password: string) {
  try {
    let Salt = await genSalt(10); // Generate Salt
    let HashedPassword = await hash(Password, Salt); // Hash Password
    return HashedPassword;
  } catch (error) {
    throw error;
  }
} // Encrypt Password
