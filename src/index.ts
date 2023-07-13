import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import { swaggerSpec } from './swagger/swagger';
const authRoute = require("./route/authRoute")
const recipeRoute = require("./route/recipeRoute")
require('./config/db')
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3003;
app.use(
  cors({
      origin:"*",
      credentials: true,
  })
);
//SwaggerUi
/* Swagger */
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));
app.get('/', (req, res, next) => res.redirect('api-docs'));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())  
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use("/api/auth", authRoute)
app.use("/api/recipes", recipeRoute)
