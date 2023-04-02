import {Model} from 'mongoose'; // import mongoose to make the types available

// import the schema
import ClientAccountSchema from '../Schema/Client Account Schema'; // import the schema

const ClientAccountModel: object = new Model(ClientAccountSchema); // export the model

export default ClientAccountModel; // export the model