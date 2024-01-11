/* This line of code is importing the `model` function from the `mongoose` library. The `model`
function is used to create a Mongoose model for a MongoDB collection. By importing this function,
the code can use it to create models for the `ClientAccountSchema` and `StoreManagementSchema`
schemas. Additionally, importing `mongoose` makes the types available for use in the code, allowing
for type checking and better code organization. */
import { model } from 'mongoose'; // import mongoose to make the types available

/* These lines of code are importing the schema definitions for two different models:
`ClientAccountSchema` and `StoreManagementSchema`. These schemas define the structure and properties
of the data that will be stored in the corresponding MongoDB collections. The schemas are defined in
separate files located in the `../Models/Schema/` directory. By importing these schemas, the code
can create Mongoose models for each schema and use them to interact with the corresponding MongoDB
collections. */
// import the schema
import ClientAccountSchema from '../Models/Schema/Client Account Schema'; // import the schema
import StoreManagementSchema from '../Models/Schema/Store Management Schema'; // import the schema


/* These lines of code are creating Mongoose models for the `ClientAccountSchema` and
`StoreManagementSchema` schemas, respectively. The `model` function from the `mongoose` library is
used to create the models, with the first argument being the name of the model and the second
argument being the schema definition. The resulting models are then exported as constants
`ClientAccountModel` and `StoreManagementModel`, respectively, so that they can be used in other
parts of the code to interact with the corresponding MongoDB collections. */
export const ClientAccountModel  = model('AccountInfo', ClientAccountSchema); // export the model

export const StoreManagementModel = model('StoreManagement', StoreManagementSchema); // export the model