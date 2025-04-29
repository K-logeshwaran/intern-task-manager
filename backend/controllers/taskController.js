
import Project from '../models/project.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
    const { title, description, projectId } = req.body;
    console.log("lokfffff",title,description,projectId);
    console.log("requested");
    
    const userId = req.user.id;

    try {
        // Check if project exists and belongs to the user
        const project = await Project.findOne({ _id: projectId, userId });
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found or unauthorized' });
        }

        console.log("req proj",project);
        project.tasks.push({ title, description});
        await project.save();
        

        // const task = new Task({
        //     title,
        //     description,
        // });

        // await task.save();

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all tasks for a project
// @route   GET /api/tasks/:projectId
// @access  Private
export const getTasks = async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user.id;

    try {
        // Check if project exists and belongs to the user
        const project = await Project.findOne({ _id: projectId, userId });
        if (!project) {
            return res.status(404).json({ message: 'Project not found or unauthorized' });
        }

        const tasks = await Task.find({ projectId });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:taskId
// @access  Private
export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if task belongs to the user's project
        const project = await Project.findOne({ _id: task.projectId, userId });
        if (!project) {
            return res.status(404).json({ message: 'Unauthorized, project not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        if (status === 'Completed') {
            task.completedAt = new Date();
        }

        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:taskId
// @access  Private
export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if task belongs to the user's project
        const project = await Project.findOne({ _id: task.projectId, userId });
        if (!project) {
            return res.status(404).json({ message: 'Unauthorized, project not found' });
        }

        await task.remove();
        res.json({ message: 'Task removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
