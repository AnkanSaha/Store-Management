// This File is used for encrypting the password and comparing the password

// import required modules
import { genSalt, hash, compare } from 'bcrypt'; // import Bcrypt

// import Variables

/**
 * This TypeScript function encrypts a password using a generated salt and hash.
 * @param {string} Password - The password that needs to be encrypted.
 * @returns the hashed password after generating a salt and hashing the original password using the
 * bcrypt library.
 */
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

/**
 * This TypeScript function compares a plain text password with a hashed password and returns a boolean
 * value indicating whether they match or not.
 * @param {string} Password - The plain text password that the user entered.
 * @param {string} HashedPassword - The HashedPassword parameter is a string that represents the hashed
 * version of a password. Hashing is a process of converting a plain text password into a unique string
 * of characters that cannot be reversed to obtain the original password. This is often used for
 * security purposes to protect sensitive information such as passwords. The
 * @returns the result of comparing the input password and hashed password. The result is a boolean
 * value indicating whether the passwords match or not.
 */
export async function ComparePassword(Password: string, HashedPassword: string) {
    // compare password
    try {
        let Compare_Result = await compare(Password, HashedPassword); // Compare Password
        return Compare_Result;
    } catch (error) {
        throw error;
    }
}
