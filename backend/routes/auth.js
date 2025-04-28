import express from 'express';
import { signupUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register new user
router.post('/signup', signupUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);

export default router;
