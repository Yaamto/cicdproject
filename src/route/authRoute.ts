import express, { Router } from 'express';
const router: Router = express.Router();
import * as authController from '../controller/authController';
import { checkAuth } from '../middleware/checkAuth';

router.post('/register', authController.register);
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/whoami', checkAuth, authController.whoami)

module.exports = router