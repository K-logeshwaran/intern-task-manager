import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post('/', protect, createTask);

// @route   GET /api/tasks/:projectId
// @desc    Get all tasks for a specific project
// @access  Private
router.get('/:projectId', protect, getTasks);

// @route   PUT /api/tasks/:taskId
// @desc    Update task
// @access  Private
router.put('/:taskId', protect, updateTask);

// @route   DELETE /api/tasks/:taskId
// @desc    Delete task
// @access  Private
router.delete('/:taskId', protect, deleteTask);

export default router;
