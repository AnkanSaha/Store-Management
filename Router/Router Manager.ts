import { Router } from 'express'; // Importing express types & Router class

const Router_Manager = Router(); // Creating a new Router instance

// import all Sub-Routers
import POST_REQUEST_Manager from './POST/POST Request Manager'; // Importing the Sub-POST-Router
import GET_REQUEST_Manager from './GET/GET Request Manager'; // Importing the Sub-GET-Router
import PUT_REQUEST_Manager from './PUT/PUT Request Manager'; // Importing the Sub-PUT-Router
import DELETE_REQUEST_Manager from './DELETE/DELETE Request Manager'; // Importing the Sub-DELETE-Router

// linking all Sub-Routers to the main Router
Router_Manager.use('/post', POST_REQUEST_Manager); // Linking the Sub-POST-Router to the main Router
Router_Manager.use('/get', GET_REQUEST_Manager); // Linking the Sub-GET-Router to the main Router
Router_Manager.use('/put', PUT_REQUEST_Manager); // Linking the Sub-PUT-Router to the main Router
Router_Manager.use('/delete', DELETE_REQUEST_Manager); // Linking the Sub-DELETE-Router to the main Router

// export the Router instance
export default Router_Manager; // Exporting the Router instance