import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/taskSlice";

export default function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    API.get("/tasks/" + id)
      .then((r) => setTask(r.data))
      .catch(() => navigate("/"));
  }, [id]);

  if (!task) return <div className="container">Loading...</div>;

  async function handleSubmit(data) {
    await dispatch(updateTask({ id, data }));
    navigate("/");
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
      <TaskDetails task={task} />
      <TaskForm initialData={task} onSubmit={handleSubmit} />
    </div>
  );
}
