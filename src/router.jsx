import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./pages/AuthGuard.jsx";
import Home from "./pages/website/Home";

export const router = createBrowserRouter([
  { path: "/", element: <Home/>},
  { path: "/register", element: <Register />},
  { path: "/login", element: <Login />},
  { path: "/dashboard", element: <AuthGuard>{(user) => <Dashboard user={user} />}</AuthGuard>},
]);