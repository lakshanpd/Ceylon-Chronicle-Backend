const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes"); // Import user routes
const postRoutes = require("./routes/postRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const dbURI = process.env.DB_URI; // Replace with your MongoDB connection string

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Use user routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", chatRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
