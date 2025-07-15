import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./pages/AuthGuard.jsx";
import Home from "./pages/website/Home";
import Transactions from "./pages/Transaction.jsx";
import LowStock from "./pages/LowStock.jsx";
import Product from "./pages/Product.jsx";
import PatientComplaints from "./pages/PatientComplaints.jsx";
import DoctorComplaints from "./pages/DoctorComplaints.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Home/>},
  { path: "/register", element: <Register />},
  { path: "/login", element: <Login />},
  { path: "/dashboard", element: <AuthGuard>{(user) => <Dashboard user={user} />}</AuthGuard>},
  { path: "/transactions", element: <AuthGuard>{(user) => <Transactions user={user} />}</AuthGuard>},
  { path: "/low-stock", element: <AuthGuard>{(user) => <LowStock user={user} />}</AuthGuard>},
  { path: "/products", element: <AuthGuard>{(user) => <Product user={user} />}</AuthGuard>},
  { path: "/complaints", element: <AuthGuard>{(user) => <PatientComplaints user={user} />}</AuthGuard>},
  { path: "/doctor-complaints", element: <AuthGuard>{(user) => <DoctorComplaints user={user} />}</AuthGuard>},
]);