/* The code is importing the `Schema` class from the `mongoose` library, which is used to define the
structure of a MongoDB document. The comment above the import states that the file is a schema for
the Store Management Database and is used to create a schema for the database. */

// This file is a schema for the Store Management Database. It is used to create a schema for the Store Management Database.
import { Schema } from 'mongoose'; // This is required to make the types available

/* The `StoreManagementSchema` constant is defining the structure of the MongoDB document for the Store
Management Database. It is an object that contains properties for each field in the document, with
each property specifying the data type, whether it is required or not, and any additional
constraints such as uniqueness or indexing. This schema will be used to create a schema for the
Store Management Database. */

const StoreManagementSchema: object = {
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

/* This code is converting the `StoreManagementSchema` object into a Mongoose schema using the `Schema`
class from the `mongoose` library. The resulting schema is then exported as the default export of
the module. This allows other modules to import and use the schema to interact with the Store
Management Database. */
// Convert the object into a schema
const Schemas = new Schema(StoreManagementSchema); // export the schema

export default Schemas; // export the schema
