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
    MongoDB_URL: `${String(process.env.STORE_MANAGEMENT_BACKEND_MONGOURL)}${String(process.env.STORE_MANAGEMENT_DB_NAME)}`, // Get MongoDB URL from .env file
    API_Allowed_URL : String(process.env.STORE_MANAGEMENT_LIVE_URL), // Main URL for this APP
    JWT_Secret : String(process.env.Store_Management_JWT_Secret) // Get JWT Secret from .env file
})

/* This code is defining an enum named `GeneralGlobalNumberData`. By using an enum, the code is creating a set of
named constants that can be used throughout the application. This allows for easier maintenance and
readability of the code. */
export enum GeneralGlobalNumberData {
    PORT = Number(process.env.STORE_MANAGEMENT_BACKEND_PORT) || 3201 // Get PORT from .env file
}

/* The code is defining an enum named `ResponseCode` that contains three named constants: `Success`,
`Fail`, and `NotAllowed`. Each constant is assigned a numeric value, with `Success` being assigned
the value `200`, `Fail` being assigned the value `404`, and `NotAllowed` being assigned the value
`405`. This enum can be used throughout the application to represent different HTTP response codes. */
// global Response code
export enum ResponseCode {
    continue = 100,
    Switching_Protocols = 101,
    Processing = 102,
    OK = 200,
    Created = 201,
    Accepted = 202,
    No_Content = 204,
    Moved_Permanently = 301,
    Found = 302,
    See_Other = 303,
    Not_Modified = 304,
    Temporary_Redirect = 307,
    Permanent_Redirect = 308,
    Bad_Request = 400,
    Unauthorized = 401,
    Forbidden = 403,
    Not_Found = 404,
    Not_Allowed = 405,
    Conflict = 409,
    Im_a_Teapot = 418,
    Internal_Server_Error = 500,
    Not_Implemented = 501,
    Bad_Gateway = 502,
    Service_Unavailable = 503,
    Gateway_Timeout = 504,
    Network_Authentication_Required = 511
}