import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors"
const authRoute = require("./route/authRoute")
const recipeRoute = require("./route/recipeRoute")
require('./config/db')
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3003;
app.use(
  cors({
      origin:"http://localhost:3000",
      credentials: true,
  })
);
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use("/api/auth", authRoute)
app.use("/api/recipes", recipeRoute)
