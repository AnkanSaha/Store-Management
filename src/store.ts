/* This code is importing necessary modules and configurations for creating an Express server in
TypeScript. It imports the `express` module for creating the server, `PORT` and `MongoDB_URL` from a
configuration file, `os` and `cluster` modules for creating a cluster of worker processes, and
creates an instance of the Express app using `express()`. */

import express from 'express'; // Import express module

import { GeneralGlobalNumberData, ResponseCode } from './config/App Config/General Config'; // PORT from General Config
import { cpus } from 'os'; // Import os module
import cluster from 'cluster'; // Import cluster module
import { Response } from './helper/API Response'; // Import Failed_Response function
const Service = express(); // Create express app

/* Importing the `MongoDB_Connect` middleware from the `./config/DB Config/MongoDB` file. This
middleware is responsible for connecting to the MongoDB database when the server starts. */
// import all Middlers

// Global Types
type num = number; // Define a type for numbers
type obj = object; // Creating a type alias for an object or undefined
type globe = any; // Creating a type alias for a string, number, boolean, object, or undefined
type str = string; // Define a type for strings

/* `// Import Routes Manager` and `import Router_Manager from './Router/Router Manager';` are importing
the `Router_Manager` middleware from the `./Router/Router Manager` file. This middleware is
responsible for managing all the routes for the Express server. It defines all the routes and their
corresponding handlers, and then links them to the main `Service` app using
`Service.use(Router_Manager)`. This allows the server to handle incoming requests and respond with
the appropriate data or actions based on the requested route. */
// Import Routes Manager
import Router_Manager from './Router/Router Manager'; // Import Router_Manager
import DB from './config/Connection/MongoDB'; // Import MongoDB_Connect middleware
// Create cluster
/* This code is creating a cluster of worker processes using the `os` and `cluster` modules in Node.js.
It first gets the number of CPUs available on the system using `os.cpus().length`. Then, if the
current process is the primary process, it creates a worker process for each CPU using
`cluster.fork()` in a loop. It also listens for the `exit` event on the worker processes and creates
a new worker process if one dies. */
// get number of cpus

/* `let numCPUs: number = os.cpus().length;` is getting the number of CPUs available on the system
using the `os` module in Node.js and storing it in the `numCPUs` variable. This is used later in the
code to create a cluster of worker processes, with each worker process running on a separate CPU. */
let numCPUs: num = cpus().length; // Get number of cpus
if (cluster.isPrimary) {
    /* This code is creating a cluster of worker processes using the `os` and `cluster` modules in
    Node.js. It first gets the number of CPUs available on the system using `os.cpus().length`.
    Then, if the current process is the primary process, it creates a worker process for each CPU
    using `cluster.fork()` in a loop. It also decrements the `numCPUs` variable after each iteration
    of the loop. This creates a cluster of worker processes, with each worker process running on a
    separate CPU. */
    while (numCPUs > 0) {
        cluster.fork(); // Create cluster for each cpu
        numCPUs--; // Decrement numCPUs
    }

    /* This code is listening for the `exit` event on the worker processes in the cluster. When a worker
   process dies, the code logs a message to the console indicating which worker process died
   (`Worker ${worker.process.pid} died`) and then creates a new worker process using
   `cluster.fork()`. This ensures that the server continues to run even if one of the worker
   processes crashes or stops working. */
    cluster.on('exit', (): void => {
        cluster.fork(); // Create new cluster if one dies
    }); // Listen for exit event
} else {
    /* `Service.use(express.static('public'));` is linking the `public` folder to the main `Service`
   app. This means that any static files (such as images, CSS, and JavaScript files) located in the
   `public` folder will be accessible through the `Service` app. When a client requests a static
   file, the server will look for it in the `public` folder and serve it to the client if it exists. */
    Service.use(express.static('public')); // Link public folder to the main app

    // link all Middleware & Routes to the main app
    /* `Service.use(Router_Manager)` is linking the `Router_Manager` middleware to the main `Service`
   app. This means that any routes defined in the `Router_Manager` will be accessible through the
   `Service` app. */
    Service.use('/api', Router_Manager); // Link Router_Manager to the main app

    // Serving static files made by React
    /* `Service.get('*', (req, res) => {...})` is a route handler that is used to serve the
    `index.html` file located in the `public` folder for any request that does not match any of the
    other routes defined in the `Router_Manager` or any static files in the `public` folder. */
    Service.get('*', (req, res): void => {
        res.header('URL', req.baseUrl);
        res.sendFile('index.html', { root: 'public' });
    });

    // API Error Handling
    interface ErrorRequestInterFace {
        originalUrl: str;
    }

    Service.all('*', (req: ErrorRequestInterFace, res: obj | globe): void => {
        Response({
            res,
            Status: 'fail',
            StatusCode: ResponseCode.Internal_Server_Error,
            Message: `Can't find ${req.originalUrl} on this server!`,
            Data: undefined,
        }); // Sending a Failed Response to the client
    }); // Catching all requests to undefined routes

    // Start server
    /* `Service.listen(PORT, async () => {...})` is starting the server and listening for incoming
   requests on the specified `PORT`. It also calls the `MongoDB_Connect` middleware to connect to
   the MongoDB database when the server starts. Once the server is started and the database is
   connected, it logs a message to the console indicating that the server is running and listening
   on the specified `PORT`. */
    Service.listen(GeneralGlobalNumberData.PORT, async (): Promise<void> => {
        /* This code is listening for the `listening` event on the `Service` app, which is emitted when the
    server starts listening for incoming requests on the specified `PORT`. When the `listening` event
    is emitted, the code calls the `MongoDB_Connect` middleware to connect to the MongoDB database
    using the `MongoDB_URL` configuration. Once the database is connected, the code logs a message to
    the console indicating that the server is running and listening on the specified `PORT`. */

        /* `DB(); // Connect to MongoDB database` is calling the `MongoDB_Connect` middleware function to
connect to the MongoDB database when the server starts. This function is responsible for
establishing a connection to the MongoDB database using the `MongoDB_URL` configuration specified in
the `./config/DB Config/MongoDB` file. Once the connection is established, the server can interact
with the database to perform CRUD (Create, Read, Update, Delete) operations on the data stored in
the database. */
        await DB(); // Connect to MongoDB database
        console.log(`Server running on port ${GeneralGlobalNumberData.PORT}`); // Log message to console
    });
}
