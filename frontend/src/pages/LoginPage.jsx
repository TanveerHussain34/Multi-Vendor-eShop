import { useEffect } from "react";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [loading, isAuthenticated, navigate]);
  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
