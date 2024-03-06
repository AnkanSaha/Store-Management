// This file is a schema for the Store Management Database. It is used to create a schema for the Store Management Database.
import { Schema } from 'mongoose'; // This is required to make the types available

// Mongodb Schema for Store Management
export default new Schema({
    StoreID: { type: Number, required: true, unique: true, index: true },
    User_id: { type: Number, required: true, unique: true, index: true },
    Email: { type: String, required: true, unique: true, index: true },
    StoreName: { type: String, required: true, index: true },
    Employees: { type: Array, required: true },
    Products: { type: Array, required: true },
    Customers: { type: Array, required: true },
    Orders: { type: Array, required: true },
    Catagories: { type: Array, required: true },
}); // export the schema
