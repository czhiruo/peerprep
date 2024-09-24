import express from 'express';
import { connectToDatabase } from './config/database';

const app = express();
const port = process.env.PORT || 8080;

async function startServer() {
  try {
    const db = await connectToDatabase();
    // You can now use `db` to interact with your MongoDB database

    app.get('/', (req, res) => {
      res.send('Hello, world!');
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
}

startServer();
