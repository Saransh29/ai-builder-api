import express from "express";
import cors from "cors";
import { connectToDatabase } from "./mongo/mongo.config";
import router from "./routes/routes";
import corsOptions from "./config/cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const server = express();

server.use(express.json({ limit: "2gb" }));
server.use(express.urlencoded({ limit: "2gb", extended: false }));
server.use(express.json());

server.use(cors(corsOptions));

server.use("/api/v1", router);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    connectToDatabase();
    server.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
