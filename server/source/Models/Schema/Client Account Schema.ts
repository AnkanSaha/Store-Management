/* This line of code is importing the `Schema` class from the `mongoose` library. It is required to
make the types available for defining the structure of the MongoDB documents in the schema. */
import { Schema } from 'mongoose'; // This is required to make the types available

// Mongodb Schema for Client Account
export default new Schema({
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
}); // export the schema
