
/* The code is importing two modules: `mongoland` and `General Config`. */
import {Mongo} from 'mongoland'; // Import mongoland module
import {GeneralGlobalStringData } from '../Keys/General Keys'; // PORT from General Config

/* This code is creating an instance of the `Mongo` class from the `mongoland` module. The instance is
being configured with a `MongoURL` property that is set to the value of
`GeneralGlobalStringData.MongoDB_URL` and a `NeverDisconnect` property that is set to `true`. This
instance is being stored in the `MongoDB` constant. This code is essentially setting up a connection
to a MongoDB database and configuring the connection to never disconnect. */
// MongoDB Connect Middleware Instance
const MongoDB = new Mongo({MongoURL:GeneralGlobalStringData.MongoDB_URL, NeverDisconnect:true}); // Create MongoDB instance


/* This line of code is exporting a default asynchronous function that connects to a MongoDB database
using the `MongoDB` instance created earlier. When this function is called, it will await the
`Connect()` method of the `MongoDB` instance to establish a connection to the database. This
function can be imported and used in other parts of the code to establish a connection to the
MongoDB database. */
export default async ()=>{await MongoDB.Connect()}; // Export MongoDB connect middleware

