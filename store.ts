import express from "express"; // Import express module
import dotenv from "dotenv"; // Import dotenv module
import os from "os"; // Import os module
import cluster from "cluster"; // Import cluster module
const Service = express(); // Create express app

// Load .env file
dotenv.config(); // Load .env file
const PORT: any = process.env.STOREMANAGEMENTBACKENDPORT; // Get port from .env file

// get number of cpus
let numCPUs: number = os.cpus().length; // Get number of cpus


// import all Middlewares
import MongoDB_Connect from "./Middleware/Connect/MongoDB"; // Import MongoDB_Connect middleware

// Import Routes Manager
import Router_Manager from "./Router/Router Manager"; // Import Router_Manager

// Create cluster
if (cluster.isPrimary) {
  while (numCPUs > 0) {
    cluster.fork(); // Create cluster for each cpu
    numCPUs--; // Decrement numCPUs
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Create new cluster if one dies
  }); // Listen for exit event
} else {
  // link all Middlewares & Routes to the main app
  Service.use(Router_Manager); // Link Router_Manager to the main app

  // Start server
  Service.listen(PORT, () => {
    MongoDB_Connect(); // Connect to MongoDB database when server starts
    console.log(`API Server is running on port ${PORT}`);
  });
}