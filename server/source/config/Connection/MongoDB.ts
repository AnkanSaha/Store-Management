/* The code is importing two modules: `mongoland` and `General Config`. */
import { Mongo } from 'mongoland'; // Import mongoland module
import { GeneralGlobalStringData } from '../Keys/General Keys'; // PORT from General Config
import { Console } from 'outers'; // Import StatusCodes from outers

// MongoDB Connect Middleware Instance
const MongoDB = new Mongo({ MongoURL: GeneralGlobalStringData.MongoDB_URL, NeverDisconnect: true }); // Create MongoDB instance

// Export and use MongoDB connect
export default async () => {
    await MongoDB.Connect();
    Console.green('Connected to MongoDB'); // Log MongoDB Connection Status
}; // Export MongoDB connect middleware
