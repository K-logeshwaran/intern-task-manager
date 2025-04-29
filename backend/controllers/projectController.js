import mongoose from "mongoose";
import Project from "../models/project.js";

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
      console.log("Max reachedddd");
      
      return res.status(400).json({ message: "Maximum 4 projects allowed" });
    }

    const project = await Project.create({
      userId,
      name,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all projects for the logged-in user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req, res) => {
  const userId = req.user.id; // From JWT token

  try {
    const projects = await Project.find({ userId }).populate("tasks");

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/projects/:projectId
// @desc    Get all projects for logged-in user
// @access  Private (use protect middleware)
export const getProject = async (req, res) => {
  console.log(req.user);
  
  const projectId = req.params.projectId
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    console.log(projectId);
    
    console.error("ERrrrrrrrrrrrrrrr")
    return res.status(400).json({ message: 'Invalid project ID' });
}
  try {
    
    const tasks = await Project.findOne({_id:projectId,userId});
    console.log("fffff",tasks);
    
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
