import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../configs/axiosConfig";
import "../styles/dashboard.css";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      const token = user.token;
      const res = await axios.get("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    try {
      const token = user.token;
      await axios.post(
        "/api/projects",
        { name: projectName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjectName("");
      fetchProjects(); // refresh projects
    } catch (err) {
      if(err.response.status == 400){
        toast("Projects Limit Reached!  Can only create 4 projects")
      };
      
      console.error(err.response.data);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const ProjectCards= ({projectName,created_at,noOfTasks})=>(<div className="card" style={{ width: "20rem" }}>
          <div className="card-body">
            <h5 className="card-title">{projectName}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{dateFormatter(created_at)}</h6>
            <p className="card-text">
              No of tasks {noOfTasks}
            </p>
            <a class="btn btn-primary disabled" role="button" aria-disabled="false">Edit Project ✏️</a>
          </div>
        </div>)


  return (
    <main>
      <nav class="navbar bg-body-tertiary p-2 d-flex flex-column justify-content-between ">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 fs-1">DashBoard 🚀</span>
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-primary btn-lg"
          >
            Logout
          </button>
        </div>
      </nav>
      <section className="dashboard-section">
        <form onSubmit={handleCreateProject} className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            aria-label="Project's name"
            aria-describedby="button-addon2"
          />
          <button
            type="submit"
            id="button-addon2"
            className="btn btn-outline-secondary"
            disabled={!projectName.trim()}
          >
            Create Project
          </button>
        </form>

        
        <div>
          {projects.length === 0 ? (
            <p>No projects yet. Create one! 🎯</p>
          ) : (
            <div className="project-display-grid">
              {projects.map((project) => {
                console.log(project);

                return (
                  <ProjectCards
                  projectName={project.name}
                  created_at={project.createdAt}
                  noOfTasks={project.tasks.length}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
      <ToastContainer/>
    </main>
  );
};

export default Dashboard;
