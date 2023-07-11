import express, { Router } from 'express';
const router: Router = express.Router();
import * as authController from '../controller/authController';

router.post('/register', authController.register);
router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router