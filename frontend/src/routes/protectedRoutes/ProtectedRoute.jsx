/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Layout/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  } else {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
    return children;
  }
};

export default ProtectedRoute;
