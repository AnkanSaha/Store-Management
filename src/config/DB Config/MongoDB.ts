// This file  for Connect MongoDB

// import all essential modules
/* This line of code is importing the `connect` and `connection` functions from the `mongoose` module.
These functions are used to connect to a MongoDB database and manage the database connection
respectively. */
import { connect, connection } from 'mongoose'; // Import mongoose module

// import Model for test connection
/* Importing the `ClientAccountModel` and `StoreManagementModel` models from the `../../Models/index`
file. These models are likely defined using the Mongoose schema and are used to interact with the
corresponding collections in the MongoDB database. */
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Import Client Account Model

// global type 
type globe = any; // Define a type for any
type str = string; // Define a type for object
type blank = void; // Define a type for null

/**
 * This function connects to a MongoDB database and tests the connection with two models, logging the
 * results and handling disconnections.
 * @param {globe}  - The function `Connect_MongoDB` takes an object as a parameter with a single property
 * `MongoDB_URL`, which is a string representing the URL of the MongoDB database to connect to. The
 * function uses the `connect` method from the `mongoose` library to connect to the database, and then
 */
export default async function Connect_MongoDB({ MongoDB_URL }: str|globe) {
    try {
        /* This code is connecting to a MongoDB database using the URL provided in the `MongoDB_URL`
        parameter. It then tests the connection by using the `find` method on two different Mongoose
        models (`ClientAccountModel` and `StoreManagementModel`) and logs the results. Finally, it
        sets up an event listener for the `connected` event on the `connection` object, which logs a
        message when the connection is established successfully. */
        await connect(MongoDB_URL); // Connect to MongoDB
        await ClientAccountModel.find({}); // Test connection with Client Account Model and log it
        await StoreManagementModel.find({}); // Test connection with Store Management Model and log it
        connection.on('connected', () => {
            console.log('MongoDB connected successfully with Server & connection with Client Account Model');
        });

        // Listen for connected event and log it
      /* This code sets up an event listener for the `disconnected` event on the `connection` object.
      When the MongoDB database connection is lost, the event listener logs a message indicating
      that the database has been disconnected from the server and then attempts to reconnect to the
      database using the `connect` method from the `mongoose` library. Once the connection is
      re-established, the event listener logs a message indicating that the database has been
      reconnected successfully with the server. */
        connection.on('disconnected', async (): Promise<blank> => {
            console.log('MongoDB disconnected with Server and trying to reconnect');
            await connect(MongoDB_URL); // Connect to MongoDB
            console.log('MongoDB reconnected successfully with Server');
        }); // Listen for disconnected event
    } catch {
        console.log('Error: MongoDB connection failed');
    }
}
