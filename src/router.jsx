import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Wrapper } from "./pages/Wrapper";
import Home from "./pages/website/Home";

export const router = createBrowserRouter([
  { path: "/", element: <App/>},
  { path: "/register", element: <Register />},
  { path: "/login", element: <Login />},
  { path: "/dashboard", element: <Wrapper><Dashboard /></Wrapper>},
  { path : "/index", element: <Home />}

]);