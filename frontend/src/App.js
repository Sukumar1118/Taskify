import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";

function AppRoutes() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  return (
    <>
      <div className="navbar">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg">
            Taskify
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/tasks/new"
                className="bg-white text-indigo-700 px-3 py-1 rounded"
              >
                New
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="px-3 py-1 rounded bg-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/tasks/new"
          element={user ? <NewTask /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks/:id"
          element={user ? <EditTask /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
