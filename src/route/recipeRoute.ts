/**
 * Recipes Routes
 * @module route/recipeRoute
 * @requires controller/recipeController
 */

import express, { Router } from "express";
const router: Router = express.Router();
import * as recipeController from "../controller/recipeController";
import { checkAuth } from "../middleware/checkAuth";

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     tags:
 *       - "Recipes"
 *     description: "Récupération de toutes les recettes"
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Toutes les recettes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   number_of_person:
 *                     type: integer
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       email:
 *                         type: string
 *                       isAdmin:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       __v:
 *                         type: integer
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                         protein_per_100:
 *                           type: number
 *                         carbohydrate_per_100:
 *                           type: number
 *                         lipid_per_100:
 *                           type: number
 *                         unity:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                         __v:
 *                           type: integer
 *                   steps:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         description:
 *                           type: string
 *                         order:
 *                           type: integer
 *                         recipe:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                         __v:
 *                           type: integer
 */
router.get("/", recipeController.findAll);
router.post("/", checkAuth, recipeController.create);
router.delete("/:id", checkAuth, recipeController.deleteRecipe);
router.get("/:id", recipeController.findOne);
router.put("/:id", checkAuth, recipeController.update);
router.get("/analyze/:id", recipeController.analyze);
router.get("/random/create", checkAuth, recipeController.random);

module.exports = router;
