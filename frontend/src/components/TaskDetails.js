
export default function TaskDetails({ task }) {
  if (!task) return null;
  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
      <div className="text-sm text-gray-600 mt-2">
        <strong>Priority:</strong> {task.priority}
      </div>
      <div className="text-sm text-gray-600">
        <strong>Status:</strong> {task.status}
      </div>
      <div className="text-sm text-gray-600">
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
      </div>
    </div>
  );
}
