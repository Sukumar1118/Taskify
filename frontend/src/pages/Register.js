import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
export default function Register({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const sub = async (e) => {
    e.preventDefault();
    const r = await api.post("/auth/register", { name, email, password });
    const { token, user } = r.data.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    nav("/");
  };
  return (
    <div className="col-md-6 offset-md-3">
      <h2>Register</h2>
      <form onSubmit={sub}>
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}
