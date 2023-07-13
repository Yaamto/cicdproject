"use strict";
/**
 * Auth Routes
 * @module route/authRoute
 * @requires controller/authController
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController = __importStar(require("../controller/authController"));
const checkAuth_1 = require("../middleware/checkAuth");
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Enregistrer un utilisateur"
 *     description: "Permet l'enregistrement d'un utilisateur via le body"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: "First name of the user"
 *               lastName:
 *                 type: string
 *                 description: "Last name of the user"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "Email address of the user"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: "Password of the user"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: "Birthday of the user"
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Utilisateur enregistrer avec succès
 *       '400':
 *         description: Informations invalides
 */
router.post('/register', authController.register);
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Connexion d'un utilisateur"
 *     description: "Permet la connexion d'un utilisateur"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "Email address of the user"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: "Password of the user"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Utilisateur connecté avec succès
 *       '400':
 *         description: Informations invalides
 */
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/whoami', checkAuth_1.checkAuth, authController.whoami);
module.exports = router;
