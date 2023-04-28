const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://www.ai-builder.live",
  })
);

// const corsOptions = require("./config/cors");
// app.use(cors(corsOptions));

const apiRoutes = require("./routes/apiRoutes.js");
const mongoRoutes = require("./routes/mongoRoutes.js");
const testRoutes = require("./routes/testRoutes.js");

app.use("/api/v1", apiRoutes);
app.use("/api/v1/", mongoRoutes);
app.use("/api/v1/", testRoutes);

app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
  });
});
