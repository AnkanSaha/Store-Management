// All Imports
export const isDevelopmentMode = import.meta.env.DEV; // Global Development Mode
export const BACKEND_Dev_PORT = import.meta.env.DEV === true ? 3202 : 3201; // Global Development Port
// HTTP Request Variables
export const Hostname: String =
  isDevelopmentMode === true
    ? `http://localhost:${BACKEND_Dev_PORT}/api`
    : `${window.location.origin}/api`; // Global Live URL
import Applogo from "../assets/Images/store-logo.png"; // App Logo

// Basic Details About the Project
export const AppName: String = "Store Manager"; // Name of the App
export const AppLogo: any = Applogo; // App Logo
export const APPURL: String = "store.theankan.live"; // App URL
export const OwnerEmail: String = "ankansahaofficial@gmail.com"; // Owner Email
export const OwnerName: String = "Ankan Saha"; // Owner Name
export const OwnerPhone: String = "9641620563"; // Owner Phone Number
export const OwnerAddress: String = "Near Daluabari Bazar, Ranaghat, WB, India"; // Owner Address
export const JWT_Secret: String | any =
  "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6"; // JWT Secret
