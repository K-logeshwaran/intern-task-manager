import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../configs/axiosConfig";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const STATUS = {
    NotStarted: "Not Started",
    InProgress: "In Progress",
    Completed: "Completed",
  };
  const { projectId } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [istaskStatusUpdated, setTaskStatusUpdated] = useState(false);
  const navigate = useNavigate();


  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(res.data);

      setProject(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      await axios.post(
        `/api/tasks`,
        {
          title: newTask,
          description: newTaskDescription,
          projectId,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setNewTask("");
      setNewTaskDescription("");
      fetchProject(); // Refresh
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartTask = async (taskId) => {
    try {
      await axios.put(
        `/api/tasks/${taskId}`,
        {
          projectId: projectId,
          status: "In Progress",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // get from localStorage or context
          },
        }
      );
      // Optionally refresh state or re-fetch task list here
      setTaskStatusUpdated((bool) => !bool);
      toast.success("Task marked as In Progress!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task status");
    }
  };

  const handleEndTask = async (taskId) => {
    try {
      await axios.put(
        `/api/tasks/${taskId}`,
        {
          projectId: projectId,
          status: STATUS.Completed,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // get from localStorage or context
          },
        }
      );
      // Optionally refresh state or re-fetch task list here
      setTaskStatusUpdated((bool) => !bool);
      toast.success("Task marked as In Progress!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task status");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // from localStorage/context
        },
      });
      setTaskStatusUpdated((bool) => !bool);
      toast.success("Task deleted successfully");
      // Optionally refresh task list or state here
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId, istaskStatusUpdated]);

  if (loading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found</p>;

  const dateFormatter = (date) => {
    let test = new Date(date);
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return test.toLocaleDateString("en-US", options);
  };

  const RenderButton = (status, taskId) => {
    switch (status) {
      case STATUS.NotStarted:
        return (
          <button
            type="button"
            class="btn btn-success btn-sm"
            onClick={() => handleStartTask(taskId)}
          >
            Start 🏁
          </button>
        );
      case STATUS.Completed:
        return (
          <button type="button" class="btn disabled btn-success btn-sm">
            Finished
          </button>
        );
      case STATUS.InProgress:
        return (
          <button
            type="button"
            class="btn btn-success btn-sm"
            onClick={() => handleEndTask(taskId)}
          >
            Finish
          </button>
        );
      default:
        return;
    }
  };

  const BgClrDecide = (status) => {
    if (status == STATUS.InProgress) {
      return "#FFD655";
    } else if (status == STATUS.Completed) {
      return "#6CF16B";
    } else {
      return "#007DFF";
    }
  };
  const TaskCards = ({
    task,
    description,
    status,
    taskId,
    projectid,
    created_at,
    completedAt,
  }) => (
    <div
      className="card"
      style={{ width: "30rem", backgroundColor: BgClrDecide(status) }}
    >
      <div className="card-body">
        <h5 className="card-title">{task}</h5>
        <div className="d-flex justify-content-between">
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Status: {status}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {dateFormatter(created_at)}
          </h6>
        </div>
        {completedAt && (
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Completed At: {dateFormatter(completedAt)}
          </h6>
        )}

        <p className="lead">{description}</p>
        <div className="d-flex justify-content-between">
          {RenderButton(status, taskId)}
          <button
            type="button"
            class="btn btn-danger btn-sm"
            onClick={() => handleDeleteTask(taskId)}
          >
            Delete 🗑️
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="p-6">
      <nav class="navbar bg-body-tertiary p-2 d-flex flex-column justify-content-between ">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 fs-1">Tasks 🚀</span>
          <button
            onClick={() => navigate("/dashboard")}
            type="button"
            className="btn btn-primary btn-lg"
          >
            Back
          </button>
        </div>
      </nav>
      <h1 className="p-4 fs-3">
        {" "}
        Project Name 🔧 : &nbsp; {project.name.toUpperCase()}{" "}
      </h1>
      <section className="dashboard-section" style={{ width: "90%" }}>
        <div className="row g-3 mb-3">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task Title"
            className="form-control"
          />
          <input
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Task Description"
            className="form-control"
          />

          <button onClick={handleAddTask} className="btn btn-outline-secondary">
            Add Task
          </button>
        </div>

        <div className="project-display-grid">
          {project.tasks.length === 0 ? (
            <p>No tasks yet. Add one! ✅</p>
          ) : (
            project.tasks.map((task) => {
              console.log("taskkkkk", task);
              return (
                <TaskCards
                  key={task._id}
                  taskId={task._id}
                  task={task.title}
                  status={task.status}
                  projectid={projectId}
                  created_at={task.createdAt}
                  description={task.description}
                  completedAt={task?.completedAt || null}
                />
              );
            })
          )}
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};

export default ProjectDetails;
