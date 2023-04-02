import express from "express"; // Import express module
import dotenv from "dotenv"; // Import dotenv module
import os from "os"; // Import os module
import cluster from "cluster"; // Import cluster module
const Service = express(); // Create express app

// Load .env file
dotenv.config(); // Load .env file
const PORT:any = process.env.PORT; // Get port from .env file

// get number of cpus
let numCPUs:number = os.cpus().length; // Get number of cpus

// Create cluster
if (cluster.isPrimary) {
    while (numCPUs > 0){
        cluster.fork(); // Create cluster for each cpu
        numCPUs--; // Decrement numCPUs
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Create new cluster if one dies
    }) // Listen for exit event
}
else{
    // Start server
    Service.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}