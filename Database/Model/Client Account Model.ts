import { model } from 'mongoose'; // import mongoose to make the types available

// import the schema
import ClientAccountSchema from '../Schema/Client Account Schema'; // import the schema

export const ClientAccountModel = model('AccountInfo', ClientAccountSchema); // export the model
