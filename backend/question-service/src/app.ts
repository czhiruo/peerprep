import express from 'express';
import router from "./routes/routes.js";
import cors from 'cors';
import { connectToDatabase } from './config/database.js';

const app = express();
const port = process.env.PORT || 8080;

async function startServer() {
  try {
    const db = await connectToDatabase();
    // You can now use `db` to interact with your MongoDB database
    app.use(cors());
    app.use(express.json());
    app.use("/api/questions", router);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
}

startServer();
