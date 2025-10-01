import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../store/authSlice";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields required");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 chars");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await dispatch(
        signup({ name: form.name, email: form.email, password: form.password })
      ).unwrap();
      navigate("/");
    } catch (err) {
      setError(err?.message || "Signup failed");
    }
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      {error && (
        <div className="bg-red-100 text-red-800 p-2 mb-3 rounded">{error}</div>
      )}
      <form onSubmit={submit}>
        <label className="block mb-1">Name</label>
        <input
          className="border p-2 w-full mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <label className="block mb-1">Email</label>
        <input
          className="border p-2 w-full mb-3"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <label className="block mb-1">Password</label>
        <input
          className="border p-2 w-full mb-3"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <label className="block mb-1">Confirm Password</label>
        <input
          className="border p-2 w-full mb-3"
          type="password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          required
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
