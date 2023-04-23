// This file is a model for the Store Management Database. It is used to create a model for the Store Management Database.
import { model } from "mongoose"; // This is required to make the types available

// import the schema
import StoreManagementSchema from '../Schema/Store Management Schema'; // import the schema

export const StoreManagementModel = model('StoreManagement', StoreManagementSchema); // export the model