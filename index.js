const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./mongo/connect.js");
const bodyParser = require("body-parser");

dotenv.config();

app.use(bodyParser.json());

const corsOptions = require("./config/cors");
app.use(cors(corsOptions));

const apiRoutes = require("./routes/apiRoutes.js");
const mongoRoutes = require("./routes/mongoRoutes.js");

app.use("/api/v1", apiRoutes);
app.use("/api/v1/", mongoRoutes);

app.use(express.json());

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
