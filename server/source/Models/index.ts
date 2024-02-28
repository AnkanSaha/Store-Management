import { model } from 'mongoose'; // import mongoose to make the types available

// import the schema
import ClientAccountSchema from './Schema/Client Account Schema'; // import the schema
import StoreManagementSchema from './Schema/Store Management Schema'; // import the schema

// export the model and schema
export const ClientAccountModel = model('AccountInfo', ClientAccountSchema); // export the model

export const StoreManagementModel = model('StoreManagement', StoreManagementSchema); // export the model
