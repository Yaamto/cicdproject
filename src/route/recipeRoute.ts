import express, { Router } from 'express';
const router: Router = express.Router();
import * as recipeController from "../controller/recipeController"
import {checkAuth} from "../middleware/checkAuth"

router.get('/', recipeController.findAll )
router.post('/', checkAuth, recipeController.create)
router.delete('/:id', checkAuth, recipeController.deleteRecipe)
router.get('/:id', recipeController.findOne)

module.exports = router