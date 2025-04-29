import express from 'express';
import { createProject, deleteProject, getProject, getProjects } from '../controllers/projectController.js';
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

// @route   GET /api/projects/:projectId
// @desc    Get all projects for logged-in user
// @access  Private (use protect middleware)
router.get('/:projectId', protect, getProject);



// @route   DELETE /api/projects/:projectId
// @desc    Delete a project for the logged-in user
// @access  Private
router.delete('/:projectId', protect, deleteProject);

export default router;
