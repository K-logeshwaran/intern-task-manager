import Project from '../models/Project.js';

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id; // Already available from decoded JWT

    try {
        // Check if user already has 4 projects
        const projectCount = await Project.countDocuments({ userId });

        if (projectCount >= 4) {
            return res.status(400).json({ message: 'Maximum 4 projects allowed' });
        }

        const project = await Project.create({
            userId,
            name,
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all projects for the logged-in user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req, res) => {
    const userId = req.user.id; // From JWT token

    try {
        const projects = await Project.find({ userId }).populate('tasks');
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
