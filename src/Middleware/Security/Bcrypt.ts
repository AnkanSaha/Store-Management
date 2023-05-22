// This File is used for encrypting the password and comparing the password

// import required modules
import { genSalt, hash, compare } from 'bcrypt'; // import Bcrypt

// import Variables

// global typescript types
type str = string; // Type for string
type bool = boolean; // Type for boolean

/**
 * This TypeScript function encrypts a password using a generated salt and hash.
 * @param {str} Password - The password that needs to be encrypted.
 * @returns the hashed password after generating a salt and hashing the original password using the
 * bcrypt library.
 */
// Function to Encrypt Password
export async function EncryptPassword(Password: str):Promise<str> {
    try {
        const Salt:str = await genSalt(10); // Generate Salt
        const HashedPassword:str = await hash(Password, Salt); // Hash Password
        return HashedPassword;
    } catch (error) {
        throw error;
    }
} // Encrypt Password

/**
 * This TypeScript function compares a plain text password with a hashed password and returns a boolean
 * value indicating whether they match or not.
 * @param {str} Password - The plain text password that the user entered.
 * @param {str} HashedPassword - The HashedPassword parameter is a string that represents the hashed
 * version of a password. Hashing is a process of converting a plain text password into a unique string
 * of characters that cannot be reversed to obtain the original password. This is often used for
 * security purposes to protect sensitive information such as passwords. The
 * @returns the result of comparing the input password and hashed password. The result is a boolean
 * value indicating whether the passwords match or not.
 */
export async function ComparePassword(Password: str, HashedPassword: str):Promise<bool> {
    // compare password
    try {
        const Compare_Result:bool = await compare(Password, HashedPassword); // Compare Password
        return Compare_Result;
    } catch (error) {
        throw error;
    }
}
