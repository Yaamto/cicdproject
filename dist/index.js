"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger/swagger");
const authRoute = require("./route/authRoute");
const recipeRoute = require("./route/recipeRoute");
require('./config/db');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
//SwaggerUi
/* Swagger */
app.use('/api-docs', swagger_ui_express_1.default.serve);
app.get('/api-docs', swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.get('/', (req, res) => res.redirect('api-docs'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.use("/api/auth", authRoute);
app.use("/api/recipes", recipeRoute);
