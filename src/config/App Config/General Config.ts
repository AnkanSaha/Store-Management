import dotenv from 'dotenv'; // Import dotenv module

dotenv.config(); // Load .env file
// Load .env file
export const MongoDB_URL: any = process.env.STOREMANAGEMENTBACKENDMONGOURL; // Get MongoDB URL from .env file
export const PORT: any = process.env.STOREMANAGEMENTBACKENDPORT; // Get port from .env file