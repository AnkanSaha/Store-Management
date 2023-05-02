// This File is used for encrypting the password and comparing the password

// import required modules
import { genSalt, hash, compare } from 'bcrypt'; // import Bcrypt

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

export async function ComparePassword(Password: string, HashedPassword: string) {
    // compare password
    try {
        let Compare_Result = await compare(Password, HashedPassword); // Compare Password
        return Compare_Result;
    } catch (error) {
        throw error;
    }
}
