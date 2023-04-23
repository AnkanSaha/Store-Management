// This file is a schema for the Store Management Database. It is used to create a schema for the Store Management Database.
import { Schema } from "mongoose"; // This is required to make the types available

const StoreManagementSchema:object = {
    User_id: { type: Number, required: true, unique: true, index: true },
    Email: { type: String, required: true, unique: true, index: true },
    StoreName: { type: String, required: true, index: true },
    Employees: { type: Array, required: true },
    Products: { type: Array, required: true },
    Customers: { type: Array, required: true },
    Orders: { type: Array, required: true },
    Suppliers: { type: Array, required: true },
    Catagories: { type: Array, required: true },
}; // This is the schema for the Store Management Database

// Convert the object into a schema
const Schemas = new Schema(StoreManagementSchema); // export the schema

export default Schemas; // export the schema