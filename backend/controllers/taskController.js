import Project from "../models/project.js";

const STATUS = {
  NotStarted: "Not Started",
  InProgress: "In Progress",
  Completed: "Completed",
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  const { title, description, projectId } = req.body;
  console.log("lokfffff", title, description, projectId);
  console.log("requested");

  const userId = req.user.id;

  try {
    // Check if project exists and belongs to the user
    const project = await Project.findOne({ _id: projectId, userId });

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });
    }

    console.log("req proj", project);
    project.tasks.push({ title, description });
    await project.save();

    // const task = new Task({
    //     title,
    //     description,
    // });

    // await task.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all tasks for a project
// @route   GET /api/tasks/:projectId
// @access  Private
// export const getTasks = async (req, res) => {
//   const { projectId } = req.params;
//   const userId = req.user.id;

//   try {
//     // Check if project exists and belongs to the user
//     const project = await Project.findOne({ _id: projectId, userId });
//     if (!project) {
//       return res
//         .status(404)
//         .json({ message: "Project not found or unauthorized" });
//     }

//     const tasks = await Task.find({ projectId });
//     res.json(tasks);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// @desc    Update a task
// @route   PUT /api/tasks/:taskId
// @access  Private
export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { projectId, title, description, status, completed_at} = req.body;
  const userId = req.user.id;

  try {
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res
        .status(404)
        .json({ message: "Unauthorized, project not found" });
    }
    console.log(project.tasks);
    //update task
    const allTasks = project.tasks;
    for (const element of allTasks) {
      if (element._id.toString() === taskId) {
        element.title = title || element.title;
        element.description = description || element?.description;
        element.status = status || element.status;


        if (status === "Completed") {
          element.completedAt = new Date();
        }

        break;
      }
    }

    project.markModified("tasks");
    await project.save();
    console.log("tasksss.",project.tasks);
    
    res.json({ message: "Task updated successfully", tasks: project.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:taskId
// @access  Private
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  try {
    // Find the project where the user owns it and it contains the task
    const project = await Project.findOne({ "tasks._id": taskId, userId });

    if (!project) {
      return res
        .status(404)
        .json({ message: "Unauthorized, project not found" });
    }

    // Filter out the task from the project's tasks array
    project.tasks = project.tasks.filter(
      (task) => task._id.toString() !== taskId
    );

    project.markModified("tasks");
    await project.save();

    res.json({ message: "Task deleted successfully", tasks: project.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
