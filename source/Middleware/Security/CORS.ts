import CORS from 'cors'; // Import CORS
import {ResponseCode, GeneralGlobalStringData} from '../../config/Keys/General Keys'; // Environmental Keys

// Main CORS Middleware
export default CORS({
    origin: GeneralGlobalStringData.API_Allowed_URL, // Allow API URL (Frontend)
    credentials: true, // Allow Credentials (Cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow Methods (GET, POST, PUT, DELETE)
    preflightContinue: false, // Stop Pre-Flight Request (OPTIONS)
    maxAge: 86400, // Set Max Age (86400 Seconds) (1 Day)
    optionsSuccessStatus: ResponseCode.No_Content, // Set Response Code
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'], // Allow Headers
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'] // Expose Headers
})