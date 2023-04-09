import { Schema } from "mongoose"; // This is required to make the types available

const ClientAccountManagementSchema:object = {
  User_id: { type: String, required: true, unique: true, index: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true, index: true },
  Password: { type: String, required: true },
  Phone: { type: Number, required: true, unique: true, index: true },
  Address: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Zip: { type: Number, required: true },
  Country: { type: String, required: true },
  CreatedAt: { type: Date, required: true, default: Date.now },
  Status: { type: String, required: true, default: "Active" },
  isTermsAccepted: { type: Boolean, required: true, default: true },
  ShopName: { type: String, required: true },
  ShopAddress: { type: String, required: true },
  isGSTIN: { type: String, required: true, default: "No" },
  GSTIN: { type: String, required: false },
  PAN: { type: String, required: true }
};

const ClientAccountSchema = new Schema(ClientAccountManagementSchema); // export the schema

export default ClientAccountSchema;
