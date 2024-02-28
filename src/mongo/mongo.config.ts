import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const { MONGODB_URL } = process.env;

let client: MongoClient | undefined;
let db: Db | undefined;

export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(MONGODB_URL!);

    try {
      await client.connect();
      db = client.db(process.env.MONGO_DATABASE!);
    } catch (err) {
      client.close();
    }
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
};
