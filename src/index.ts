import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const authRoute = require("./route/authRoute")
const recipeRoute = require("./route/recipeRoute")
require('./config/db')
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use("/api/auth", authRoute)
app.use("/api/recipes", recipeRoute)
