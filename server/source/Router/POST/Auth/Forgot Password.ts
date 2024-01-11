import { Router, json } from "express"; // Express Server

// import Controller
import ResetPassword from "../../../Service/Auth/Forgot Password"; // Reset Password

// import middleware
import {AccountExistMiddleware} from "../../../Middleware/Store Management/AccountExistMiddileware"; // Account Exist Middleware
import JWTVerifyMiddleware from "../../../Middleware/Auth/JWT Verify Middleware"; // JWT Verify Middleware

// Setting up the Router
const ForgotPasswordRouter: Router = Router();

// export the Router
export default ForgotPasswordRouter;

// All the Routes for this Router
ForgotPasswordRouter.post("/reset-password", json(), AccountExistMiddleware, JWTVerifyMiddleware, ResetPassword)