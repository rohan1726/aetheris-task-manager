const priorityClass = {
  High: "priority-high",
  Medium: "priority-medium",
  Low: "priority-low",
};

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  return (
    <div className={`task-card ${task.status === "completed" ? "task-completed" : ""}`}>
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${priorityClass[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      {task.description && <p className="task-description">{task.description}</p>}
      
      <div className="task-meta">
        <span className="date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {formattedDate}
        </span>
        <span className={`status-badge status-${task.status}`}>{task.status}</span>
      </div>
      
      <div className="task-actions">
        <button 
          className={`btn btn-small ${task.status === "completed" ? "btn-outline" : "btn-success"}`} 
          onClick={() => onToggleComplete(task)}
          title={task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
        >
          {task.status === "completed" ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
              </svg>
              Undo
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              Complete
            </>
          )}
        </button>
        <button 
          className="btn btn-small btn-outline" 
          onClick={() => onEdit(task)}
          title="Edit Task"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit
        </button>
        <button 
          className="btn btn-small btn-danger" 
          onClick={() => onDelete(task._id)}
          title="Delete Task"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
