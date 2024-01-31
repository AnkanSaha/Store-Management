/* This line of code is importing the `dotenv` module in a TypeScript file. The `dotenv` module allows
developers to load environment variables from a `.env` file into the Node.js `process.env` object.
This is useful for keeping sensitive information, such as API keys or database credentials, out of
the codebase and in a separate file that can be easily managed. */
import dotenv from 'dotenv'; // Import dotenv module

/* `dotenv.config()` is a method that loads the environment variables from a `.env` file into the
Node.js `process.env` object. This allows developers to keep sensitive information, such as API keys
or database credentials, out of the codebase and in a separate file that can be easily managed. By
calling `dotenv.config()`, the environment variables defined in the `.env` file are made available
to the application. */
dotenv.config(); // Load .env file
// Load .env file

// global types
type str = string; // Define a type for strings

/* The `interface GeneralGlobalStringDataInterface` is defining a type for an object that has two
properties: `MongoDB_URL` and `APP_URL`. Both properties are of type `str`, which is a type alias
for `string`. This interface is used to ensure that any object that is expected to have these two
properties will have the correct types for those properties. */
type GeneralGlobalStringDataType = {
    MongoDB_URL: str; // Define a type for MongoDB URL
    API_Allowed_URL: str; // Define a type for APP URL
    JWT_Secret: str; // Define a type for JWT Secret
}

/* This code is exporting a constant named `GeneralGlobalStringData` that is of type
`GeneralGlobalStringDataInterface`. It contains two properties: `MongoDB_URL` and `APP_URL`. */
export const GeneralGlobalStringData : GeneralGlobalStringDataType = Object.freeze({
    MongoDB_URL: `${String(process.env.MONGODB_URL)}${String(process.env.DB_NAME)}`, // Get MongoDB URL from .env file
    API_Allowed_URL : String(process.env.LIVE_URL) || "http://localhost:5173", // Main URL for this APP
    JWT_Secret : String(process.env.JWT_SECRET) // Get JWT Secret from .env file
})

/* This code is defining an enum named `GeneralGlobalNumberData`. By using an enum, the code is creating a set of
named constants that can be used throughout the application. This allows for easier maintenance and
readability of the code. */
export enum GeneralGlobalNumberData {
    PORT = Number(process.env.PORT) || 3201 // Get PORT from .env file
}