// This file  for Connect MongoDB

import { connect, connection } from "mongoose"; // Import mongoose module
const MongoDB_URL: any = process.env.STOREMANAGEMENTBACKENDMONGOURL; // Get MongoDB URL from .env file

export default async function Connect_MongoDB() {
  try {
    await connect(MongoDB_URL); // Connect to MongoDB
    console.log("MongoDB connected successfully with Server");

    // Listen for connected event and log it
    connection.on("disconnected", async () => {
      console.log("MongoDB disconnected with Server and trying to reconnect");
      await connect(MongoDB_URL); // Connect to MongoDB
      console.log("MongoDB reconnected successfully with Server");
    }); // Listen for disconnected event
  } catch {
    console.log("Error: MongoDB connection failed");
  }
}
