import express from 'express';
import { createProject, getProjects } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import protect middleware

const router = express.Router();

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (use protect middleware)
router.post('/', protect, createProject);

// @route   GET /api/projects
// @desc    Get all projects for logged-in user
// @access  Private (use protect middleware)
router.get('/', protect, getProjects);

export default router;
