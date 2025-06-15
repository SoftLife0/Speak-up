import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./pages/AuthGuard.jsx";
import Home from "./pages/website/Home";
import Transactions from "./pages/Transaction.jsx";
import LowStock from "./pages/LowStock.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Home/>},
  { path: "/register", element: <Register />},
  { path: "/login", element: <Login />},
  { path: "/dashboard", element: <AuthGuard>{(user) => <Dashboard user={user} />}</AuthGuard>},
  { path: "/transactions", element: <AuthGuard>{(user) => <Transactions user={user} />}</AuthGuard>},
  { path: "/low-stock", element: <AuthGuard>{(user) => <LowStock user={user} />}</AuthGuard>},
]);