import { Router } from "express"; // Importing express types & Router class

const FrontEnd_Router = Router(); // Creating a new Router instance
const Path = __dirname; // Getting the path to the current directory

// Routes
FrontEnd_Router.get("/", (req, res) => {
    res.status(200).sendFile(`${Path}/public/index.html`); // Send index.html file
}); // Get request to the root route

// Exporting the router
export default FrontEnd_Router; // Exporting the router