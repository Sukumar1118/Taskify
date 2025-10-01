import { useState, useEffect } from "react";

export default function TaskForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm((prev) => ({
        ...prev,
        title: initialData.title || "",
        description: initialData.description || "",
        dueDate: initialData.dueDate
          ? initialData.dueDate.substring(0, 10)
          : "",
        priority: initialData.priority || "Low",
        status: initialData.status || "Pending",
      }));
    }
  }, [initialData]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const err = {};
    if (!form.title || form.title.trim().length < 3)
      err.title = "Title at least 3 characters";
    if (form.dueDate && isNaN(new Date(form.dueDate).getTime()))
      err.dueDate = "Invalid date";
    return err;
  }

  function submit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block mb-1">Title</label>
        <input
          name="title"
          className="border p-2 w-full"
          value={form.title}
          onChange={handleChange}
          required
        />
        {errors.title && (
          <div className="text-red-600 text-sm">{errors.title}</div>
        )}
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          className="border p-2 w-full"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block mb-1">Due Date</label>
        <input
          type="date"
          name="dueDate"
          className="border p-2 w-full"
          value={form.dueDate ? form.dueDate.substring(0, 10) : ""}
          onChange={handleChange}
        />
        {errors.dueDate && (
          <div className="text-red-600 text-sm">{errors.dueDate}</div>
        )}
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block mb-1">Priority</label>
          <select
            name="priority"
            className="border p-2 w-full"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        {initialData._id && (
          <div className="w-40">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              className="border p-2 w-full"
              value={form.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>
        )}
      </div>
      <div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          {initialData._id ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}
