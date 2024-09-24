import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const uri = process.env.MONGO_URI as string; // Use the connection string from .env

if (!uri) {
  throw new Error('MONGO_URI environment variable is missing');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('cs3219-project-g22'); 
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  } 
}

export { client };

