// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    loading,
    error: authError,
  } = useSelector((state) => state.auth);

  // redirect if user is logged in
  useEffect(() => {
    if (user) {
      navigate("/"); // go to home/tasks page
    }
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Email and password required");
      return;
    }
    try {
      await dispatch(login(form)).unwrap();
      navigate("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    }
  }

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {(error || authError) && (
        <div className="bg-red-100 text-red-800 p-2 mb-3 rounded">
          {error || authError}
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
