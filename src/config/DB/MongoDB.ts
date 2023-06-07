/* These lines of code are importing the `Mongo` class from the `mongo-always` module and the
`GeneralGlobalStringData` object from the `../App Config/General Config` file. The `Mongo` class is
used to connect to a MongoDB database, while the `GeneralGlobalStringData` object contains the URL
of the MongoDB database. These imports are necessary for establishing a connection to the MongoDB
database. */
import {Mongo} from 'mongo-always'; // Import mongo-always module
import {GeneralGlobalStringData } from '../App Config/General Config'; // PORT from General Config

/* This code is creating an instance of the `Mongo` class from the `mongo-always` module. The `Mongo`
class is used to connect to a MongoDB database. The constructor of the `Mongo` class takes two
arguments: the URL of the MongoDB database and a boolean value indicating whether to use the new URL
parser. The URL of the MongoDB database is obtained from the `GeneralGlobalStringData` module, which
is imported from the `../App Config/General Config` file. The `true` value for the second argument
indicates that the new URL parser should be used. The resulting `MongoDB` object is an instance of
the `Mongo` class that can be used to connect to the MongoDB database. */
// MongoDB Connect Middleware Instance
const MongoDB = new Mongo(GeneralGlobalStringData.MongoDB_URL, true); // Create MongoDB instance

/* This code exports an asynchronous function that connects to a MongoDB database using the
`mongo-always` module. The function is defined using an arrow function syntax and is set as the
default export of the module. When this module is imported into another module, the default export
can be called as a function to establish a connection to the MongoDB database. */
export default async ()=>{await MongoDB.alwaysConnect()}; // Export MongoDB connect middleware

