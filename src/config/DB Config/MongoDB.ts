// This file  for Connect MongoDB

// import all essential modules
import { connect, connection } from 'mongoose'; // Import mongoose module

// import Model for test connection
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Import Client Account Model

export default async function Connect_MongoDB({ MongoDB_URL}:any) {
    try {
        await connect(MongoDB_URL); // Connect to MongoDB
        await ClientAccountModel.find({}); // Test connection with Client Account Model and log it
        await StoreManagementModel.find({}); // Test connection with Store Management Model and log it
        console.log('MongoDB connected successfully with Server & connection with Client Account Model');

        // Listen for connected event and log it
        connection.on('disconnected', async () => {
            console.log('MongoDB disconnected with Server and trying to reconnect');
            await connect(MongoDB_URL); // Connect to MongoDB
            console.log('MongoDB reconnected successfully with Server');
        }); // Listen for disconnected event
    } catch {
        console.log('Error: MongoDB connection failed');
    }
}
