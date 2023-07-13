/**
 * Auth Routes
 * @module route/authRoute
 * @requires controller/authController
 */


import express, { Router } from 'express';
const router: Router = express.Router();
import * as authController from '../controller/authController';
import { checkAuth } from '../middleware/checkAuth';

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
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/whoami', checkAuth, authController.whoami)

module.exports = router