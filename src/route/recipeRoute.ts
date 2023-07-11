import express, { Router } from 'express';
const router: Router = express.Router();
import * as recipeController from "../controller/recipeController"

router.get('/', recipeController.findAll )
router.post('/', recipeController.create)

module.exports = router