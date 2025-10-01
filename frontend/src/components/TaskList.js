import { Link } from "react-router-dom";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks || tasks.length === 0) return <div>No tasks found</div>;
  return (
    <div>
      {tasks.map((t) => (
        <div className="task-card" key={t._id}>
          <div>
            <h4 className="text-lg font-semibold">
              {t.title}{" "}
              <small className="text-sm text-gray-600">({t.priority})</small>
            </h4>
            <p className="text-sm text-gray-700">{t.description}</p>
            <div className="text-sm text-gray-500">Status: {t.status}</div>
            <div className="text-sm text-gray-500">
              Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <button
              onClick={() => onToggle(t)}
              className="mb-2 bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              {t.status === "Pending" ? "Mark Done" : "Mark Pending"}
            </button>
            <Link to={"/tasks/" + t._id} className="mb-2 text-indigo-600">
              Edit
            </Link>
            <button
              onClick={() => onDelete(t._id)}
              className="mb-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
