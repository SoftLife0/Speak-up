import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext"; // adjust the path as needed

const AuthGuard = ({ children }) => {
  const { user, loading } = useUser(); // use loading
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please log in to continue", { position: "top-right", hideProgressBar: true });
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  
  if (loading || !user) return null; // don't render until loading is done
  console.log("New user", user)
  return children(user);
};


export default AuthGuard;
