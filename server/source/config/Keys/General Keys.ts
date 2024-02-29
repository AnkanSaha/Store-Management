import { config } from 'dotenv'; // Import dotenv module
config(); // Load .env file
// Load .env file

// global types
type str = string; // Define a type for strings

type GeneralGlobalStringDataType = {
    MongoDB_URL: str; // Define a type for MongoDB URL
    API_Allowed_URL: str; // Define a type for APP URL
    JWT_Secret: str; // Define a type for JWT Secret
};

// Global String Variables
export const GeneralGlobalStringData: GeneralGlobalStringDataType = Object.freeze({
    MongoDB_URL: `${String(process.env.MONGODB_URL)}${String(process.env.DB_NAME)}`, // Get MongoDB URL from .env file
    API_Allowed_URL: String(process.env.CORS_ORIGIN) ?? 'http://localhost:5173', // Main URL for this APP
    JWT_Secret: String(process.env.JWT_SECRET), // Get JWT Secret from .env file
});

export enum GeneralGlobalNumberData {
    PORT = Number(process.env.PORT) ?? 3201, // Get PORT from .env file
    CPU = (Number(process.env.CPU_COUNT_MULTIPLIERENV) ?? 1) * 2, // Get CPU from.env file
}
