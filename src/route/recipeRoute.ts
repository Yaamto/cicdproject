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
 *     summary: "Récupération de toutes les recettes"
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
router.get('/', recipeController.findAll )
/**
 * @openapi
 * /api/recipes:
 *   post:
 *     tags:
 *       - "Recipes"
 *     summary: "Créer une recette"
 *     description: "Création d'une recette"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the recipe"
 *               number_of_person:
 *                 type: integer
 *                 description: "Number of persons"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: "Name of the ingredient"
 *                     quantity:
 *                       type: number
 *                       description: "Quantity of the ingredient"
 *                     protein_per_100:
 *                       type: number
 *                       description: "Protein per 100 grams of the ingredient"
 *                     carbohydrate_per_100:
 *                       type: number
 *                       description: "Carbohydrate per 100 grams of the ingredient"
 *                     lipid_per_100:
 *                       type: number
 *                       description: "Lipid per 100 grams of the ingredient"
 *                     unity:
 *                       type: string
 *                       description: "Unit of measurement of the ingredient"
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       description: "Description of the step"
 *                     order:
 *                       type: integer
 *                       description: "Order of the step in the recipe"
 *             required:
 *               - name
 *               - number_of_person
 *               - ingredients
 *               - steps
 *     responses:
 *       '201':
 *         description: Recipe created successfully
 *       '400':
 *         description: Invalid informations
 *       '403':
 *         description: Forbidden - Missing or expired JWT token
 */
router.post('/', checkAuth, recipeController.create)
/**
 * @openapi
 * /api/recipes/{id}:
 *   delete:
 *     tags:
 *       - "Recipes"
 *     summary: "Supprime une recette"
 *     description: "Supprime une recette grâce à son ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID de la recette à supprimer"
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Recette supprimée avec succès
 *       '400':
 *         description: Erreur lors de la suppression de la recette
 *       '403':
 *         description: Forbidden - Missing or expired JWT token
 */
router.delete('/:id', checkAuth, recipeController.deleteRecipe)
/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     tags:
 *       - "Recipes"
 *     description: "Récupération d'une seule recette grâce à son ID"
 *     summary: "Récupère une recette"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la recette qu'on souhaite récupérer.
 *         schema:
 *           type: string
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
router.get('/:id', recipeController.findOne)
/**
 * @openapi
 * /api/recipes/{id}:
 *   put:
 *     tags:
 *       - "Recipes"
 *     summary: "Modification d'une recette"
 *     description: "Modifier une recette grâce à son ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID de la recette à modifier"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the recipe"
 *               number_of_person:
 *                 type: integer
 *                 description: "Number of persons"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: "Name of the ingredient"
 *                     quantity:
 *                       type: number
 *                       description: "Quantity of the ingredient"
 *                     protein_per_100:
 *                       type: number
 *                       description: "Protein per 100 grams of the ingredient"
 *                     carbohydrate_per_100:
 *                       type: number
 *                       description: "Carbohydrate per 100 grams of the ingredient"
 *                     lipid_per_100:
 *                       type: number
 *                       description: "Lipid per 100 grams of the ingredient"
 *                     unity:
 *                       type: string
 *                       description: "Unit of measurement of the ingredient"
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       description: "Description of the step"
 *                     order:
 *                       type: integer
 *                       description: "Order of the step in the recipe"
 *             required:
 *               - name
 *               - number_of_person
 *               - ingredients
 *               - steps
 *     responses:
 *       '200':
 *         description: Recipe updated successfully
 *       '400':
 *         description: Invalid information
 *       '403':
 *         description: Forbidden - Missing or expired JWT token
 *       '404':
 *         description: Recipe not found
 */
router.put('/:id', checkAuth, recipeController.update)
/**
 * @swagger
 * /api/recipes/analyze/{id}:
 *   get:
 *     tags:
 *       - "Recipes"
 *     description: "Analyse des apports nutritionnels d'une recette "
 *     summary: "Analyse une recette par son ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la recette qu'on souhaite analyser
 *         schema:
 *           type: string
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
 *                   totalProtein:
 *                     type: integer
 *                   totalLipide:
 *                     type: integer
 *                   totalGlucide:
 *                     type: integer
 *                   totalCalorique:
 *                     type: integer
 *
 */
router.get('/analyze/:id', recipeController.analyze)
/**
 * @openapi
 * /api/recipes/single/analyze:
 *   post:
 *     tags:
 *       - "Recipes"
 *     summary: "Analyse une recette par son objet"
 *     description: "Analyse une recette"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the recipe"
 *               number_of_person:
 *                 type: integer
 *                 description: "Number of persons"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: "Name of the ingredient"
 *                     quantity:
 *                       type: number
 *                       description: "Quantity of the ingredient"
 *                     protein_per_100:
 *                       type: number
 *                       description: "Protein per 100 grams of the ingredient"
 *                     carbohydrate_per_100:
 *                       type: number
 *                       description: "Carbohydrate per 100 grams of the ingredient"
 *                     lipid_per_100:
 *                       type: number
 *                       description: "Lipid per 100 grams of the ingredient"
 *                     unity:
 *                       type: string
 *                       description: "Unit of measurement of the ingredient"
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       description: "Description of the step"
 *                     order:
 *                       type: integer
 *                       description: "Order of the step in the recipe"
 *             required:
 *               - name
 *               - number_of_person
 *               - ingredients
 *               - steps
 *     responses:
 *       '200':
 *         description: Recipe created successfully
 *       '400':
 *         description: Invalid informations
 */
router.post('/single/analyze', recipeController.analyzeObject)
/**
 * @swagger
 * /api/recipes/random/create:
 *   get:
 *     tags:
 *       - "Recipes"
 *     description: "Génération d'une recette aléatoire grâce aux recettes existantes"
 *     summary: "Générer une recette aléatoire"
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Recette
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
 * 
 */
router.get('/random/create', checkAuth, recipeController.random)


module.exports = router;
