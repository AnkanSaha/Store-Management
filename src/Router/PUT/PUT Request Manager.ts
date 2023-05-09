/* This code is importing the `Router` class from the `express` module and creating a new instance of
the `Router` class called `PUT_REQUEST_Manager`. The `Router` class is used to create modular,
mountable route handlers for a web application. This instance can be used to define routes and
middleware specific to the PUT HTTP method. */
import { Router } from 'express'; // Importing express types & Router class

const PUT_REQUEST_Manager = Router(); // Creating a new Router instance

// import all Sub-Routers

// linking all Sub-Routers to the main Router

/* `export default PUT_REQUEST_Manager;` is exporting the `PUT_REQUEST_Manager` instance of the
`Router` class as the default export of this module. This means that when another module imports
this module, they will receive the `PUT_REQUEST_Manager` instance as the default export, which they
can then use to define routes and middleware specific to the PUT HTTP method. */
export default PUT_REQUEST_Manager; // Exporting the Router instance
