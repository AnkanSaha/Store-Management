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
type globe = any; // Define a type for any

/* This line of code is exporting a constant variable named `MongoDB_URL` with the value of the
environment variable `STOREMANAGEMENTBACKENDMONGOURL` from the `.env` file. The `any` type is used
to indicate that the type of the variable can be any type. This allows the variable to be assigned
any value without type checking. */
export const MongoDB_URL: str | globe = process.env.STOREMANAGEMENTBACKENDMONGOURL; // Get MongoDB URL from .env file
/* This line of code is exporting a constant variable named `PORT` with the value of the environment
variable `STOREMANAGEMENTBACKENDPORT` from the `.env` file. The `any` type is used to indicate that
the type of the variable can be any type. This allows the variable to be assigned any value without
type checking. The exported `PORT` variable can be used in other modules or files that import this
module. */
export const PORT: str | globe = process.env.STOREMANAGEMENTBACKENDPORT; // Get port from .env file