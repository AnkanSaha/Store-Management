/* The code is importing the `Schema` class from the `mongoose` library, which is used to define the
structure of a MongoDB document. The comment above the import states that the file is a schema for
the Store Management Database and is used to create a schema for the database. */

// This file is a schema for the Store Management Database. It is used to create a schema for the Store Management Database.
import { Schema } from 'mongoose'; // This is required to make the types available

/* This code is defining a schema for the Store Management Database using the `Schema` class from the
`mongoose` library. The schema defines the structure of a MongoDB document and includes fields for
`User_id`, `Email`, `StoreName`, `Employees`, `Products`, `Customers`, `Orders`, `Suppliers`, and
`Catagories`. Each field has a specified data type and required property. The `export default`
statement exports the schema so that it can be used in other files. */

export default new Schema({
    StoreID: { type: Number, required: true, unique: true, index: true },
    User_id: { type: Number, required: true, unique: true, index: true },
    Email: { type: String, required: true, unique: true, index: true },
    StoreName: { type: String, required: true, index: true },
    Employees: { type: Array, required: true },
    Products: { type: Array, required: true },
    Customers: { type: Array, required: true },
    Orders: { type: Array, required: true },
    Suppliers: { type: Array, required: true },
    Catagories: { type: Array, required: true },
}); // export the schema
