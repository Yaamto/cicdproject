const mongoose = require("mongoose");

require('dotenv').config()

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ivelk.mongodb.net/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
    })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: Error) => console.log("Failed to connect to MongoDB", err));