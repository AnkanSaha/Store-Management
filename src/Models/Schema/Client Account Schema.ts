/* This line of code is importing the `Schema` class from the `mongoose` library. It is required to
make the types available for defining the structure of the MongoDB documents in the schema. */
import { Schema } from 'mongoose'; // This is required to make the types available

/* This code defines the structure of a MongoDB document for a client account management system. It
defines the fields that will be stored in the database, their data types, and whether they are
required or have default values. The `ClientAccountManagementSchema` object is used to create a new
`Schema` instance from the `mongoose` library, which can then be used to create and manipulate
documents in the database. */
const ClientAccountManagementSchema: object = {
    User_id: { type: Number, required: true, unique: true, index: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true, index: true },
    Password: { type: String, required: true },
    Phone: { type: Number, required: true, unique: true, index: true },
    Address: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Zip: { type: Number, required: true },
    Country: { type: String, required: true },
    SecurityQuestion: { type: String, required: true },
    SecurityAnswer: { type: String, required: true },
    CreatedAt: { type: Date, required: true, default: Date.now },
    Status: { type: String, required: true, default: 'Active' },
    isTermsAccepted: { type: Boolean, required: true, default: true },
    ShopName: { type: String, required: true },
    ShopAddress: { type: String, required: true },
    isGSTIN: { type: String, required: true, default: 'No' },
    GSTIN: { type: String, required: false },
    PAN: { type: String, required: true },
};

/* This code creates a new `Schema` instance from the `mongoose` library using the
`ClientAccountManagementSchema` object, which defines the structure of a MongoDB document for a
client account management system. The `ClientAccountSchema` variable is then assigned the new
`Schema` instance, which can be used to create and manipulate documents in the database. Finally,
the `ClientAccountSchema` variable is exported as the default export of the module, so that it can
be imported and used in other parts of the application. */
const ClientAccountSchema = new Schema(ClientAccountManagementSchema); // export the schema

export default ClientAccountSchema;
