/* This code is importing the `Router` class from the `express` module and creating a new instance of
it called `Router_Manager`. The `Router` class is used to create modular, mountable route handlers
for a web application. By creating a new instance of `Router`, we can define routes and middleware
specific to that instance, and then mount it as a middleware to the main Express application using
`app.use()`. */
import { Router } from 'express'; // Importing express types & Router class
import { Failed_Response } from '../helper/API Response'; // Importing the Failed_Response function

const Router_Manager = Router(); // Creating a new Router instance

/* These lines of code are importing four different sub-routers that handle specific types of HTTP
requests (POST, GET, PUT, and DELETE). Each sub-router is defined in a separate file located in
subdirectories named after the HTTP request type (e.g. `./POST/POST Request Manager`). The imported
sub-routers will be linked to the main router instance (`Router_Manager`) using the `use()` method,
which allows the main router to delegate requests to the appropriate sub-router based on the URL
path. */
// import all Sub-Routers
import POST_REQUEST_Manager from './POST/POST Request Manager'; // Importing the Sub-POST-Router
import GET_REQUEST_Manager from './GET/GET Request Manager'; // Importing the Sub-GET-Router
import PUT_REQUEST_Manager from './PUT/PUT Request Manager'; // Importing the Sub-PUT-Router
import DELETE_REQUEST_Manager from './DELETE/DELETE Request Manager'; // Importing the Sub-DELETE-Router

/* These lines of code are linking the sub-routers for handling specific types of HTTP requests (POST,
GET, PUT, and DELETE) to the main router instance (`Router_Manager`). This is done using the `use()`
method, which allows the main router to delegate requests to the appropriate sub-router based on the
URL path. For example, any requests with a URL path starting with `/post` will be handled by the
`POST_REQUEST_Manager` sub-router. */
// linking all Sub-Routers to the main Router
Router_Manager.use('/post', POST_REQUEST_Manager); // Linking the Sub-POST-Router to the main Router
Router_Manager.use('/get', GET_REQUEST_Manager); // Linking the Sub-GET-Router to the main Router
Router_Manager.use('/put', PUT_REQUEST_Manager); // Linking the Sub-PUT-Router to the main Router
Router_Manager.use('/delete', DELETE_REQUEST_Manager); // Linking the Sub-DELETE-Router to the main Router


// API Error Handling
Router_Manager.all('*', (req, res) => {
    Failed_Response({res:res, Status:"fail", Message:`Can't find ${req.originalUrl} on this server!`, Data:undefined}); // Sending a Failed Response to the client
}); // Catching all requests to undefined routes

/* These lines of code are exporting the `Router_Manager` instance as the default export of this
module. This means that when this module is imported into another module using `import`, the
`Router_Manager` instance can be accessed as the default export of this module. This allows other
modules to use the routes and middleware defined in this module by mounting the `Router_Manager`
instance as middleware in their own Express applications using `app.use()`. */
// export the Router instance
export default Router_Manager; // Exporting the Router instance
