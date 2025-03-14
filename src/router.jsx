import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Wrapper } from "./pages/Wrapper";
import Home from "./pages/website/Home";

export const router = createBrowserRouter([
  { path: "/", element: <Home/>},
  { path: "/register", element: <Register />},
  { path: "/login", element: <Login />},
  { path: "/dashboard", element: <Wrapper><Dashboard /></Wrapper>},
]);