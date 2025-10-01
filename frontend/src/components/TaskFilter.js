import { useState, useEffect } from "react";

export default function TaskFilter({ onChange }) {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    onChange({ status, priority });
  }, [status, priority]);

  return (
    <div className="filters">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2"
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}
