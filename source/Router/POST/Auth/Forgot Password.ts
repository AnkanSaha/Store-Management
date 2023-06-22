import { Router, json } from "express"; // Express Server
import CORS from "cors"; // CORS

// import Controller
import ResetPassword from "../../../Service/Auth/Forgot Password"; // Reset Password

// import middleware
import {AccountExistMiddleware} from "../../../Middleware/Store Management/AccountExistMiddileware"; // Account Exist Middleware
import JWTVerifyMiddleware from "../../../Middleware/Auth/JWT Verify Middleware"; // JWT Verify Middleware

// Import Global Values
import { GeneralGlobalStringData } from "../../../config/Keys/General Keys"; // Global Strings

// Setting up the Router
const ForgotPasswordRouter: Router = Router();
ForgotPasswordRouter.use(CORS({
    origin: GeneralGlobalStringData.API_Allowed_URL
})); // CORS for Allowing Access from Frontend

// export the Router
export default ForgotPasswordRouter;

// All the Routes for this Router
ForgotPasswordRouter.post("/reset-password", json(), AccountExistMiddleware, JWTVerifyMiddleware, ResetPassword)