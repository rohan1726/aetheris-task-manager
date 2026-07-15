import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import Spinner from "../components/Spinner";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [view, setView] = useState("all"); // all | pending | completed
  const [priorityFilter, setPriorityFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (view !== "all") params.status = view;
      if (priorityFilter) params.priority = priorityFilter;
      if (search) params.search = search;

      const { data } = await getTasks(params);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [view, priorityFilter, search]);

  useEffect(() => {
    const debounce = setTimeout(fetchTasks, 300);
    return () => clearTimeout(debounce);
  }, [fetchTasks]);

  const handleAddClick = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      setModalOpen(false);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save task");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await updateTask(task._id, { status: newStatus });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>My Tasks</h1>
            <p className="task-summary">
              {pendingCount} pending · {completedCount} completed
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleAddClick}>
            + Add Task
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="filters-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="view-tabs">
            <button
              className={`tab ${view === "all" ? "tab-active" : ""}`}
              onClick={() => setView("all")}
            >
              All
            </button>
            <button
              className={`tab ${view === "pending" ? "tab-active" : ""}`}
              onClick={() => setView("pending")}
            >
              Pending
            </button>
            <button
              className={`tab ${view === "completed" ? "tab-active" : ""}`}
              onClick={() => setView("completed")}
            >
              Completed
            </button>
          </div>
          <select
            className="priority-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {loading ? (
          <Spinner />
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem", color: "var(--text-muted)" }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="9" y1="15" x2="15" y2="15"></line>
              <line x1="9" y1="11" x2="15" y2="11"></line>
            </svg>
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingTask}
      />
    </div>
  );
};

export default Dashboard;
