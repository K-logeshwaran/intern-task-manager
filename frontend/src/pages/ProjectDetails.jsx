import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../configs/axiosConfig';
import { useAuth } from '../contexts/AuthContext';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

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
          description: 'will be addedd',
          projectId,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setNewTask('');
      fetchProject(); // Refresh
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  if (loading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{project.name} 🔧</h2>

      <div className="mb-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task Title"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <ul>
        {project.tasks.length === 0 ? (
          <p>No tasks yet. Add one! ✅</p>
        ) : (
          project.tasks.map((task) => (
            <li
              key={task._id}
              className="border p-4 mb-2 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p>Status: {task.status}</p>
              </div>
              {/* You can add Edit/Delete buttons here */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProjectDetails;
