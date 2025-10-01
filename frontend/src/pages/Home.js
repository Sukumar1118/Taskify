import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  setFilters,
  deleteTask,
  updateTask,
} from "../store/taskSlice";
import TaskFilter from "../components/TaskFilter";
import TaskList from "../components/TaskList";

export default function Home() {
  const { tasks, loading, filters } = useSelector((s) => s.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, filters]);

  async function toggleStatus(t) {
    const updated = {
      ...t,
      status: t.status === "Pending" ? "Completed" : "Pending",
    };
    dispatch(updateTask({ id: t._id, data: updated }));
  }
  function del(id) {
    if (window.confirm("Delete?")) {
      dispatch(deleteTask(id));
    }
  }
  function onFilterChange(f) {
    dispatch(setFilters(f));
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
      <TaskFilter onChange={onFilterChange} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TaskList tasks={tasks} onToggle={toggleStatus} onDelete={del} />
      )}
    </div>
  );
}
