import { useNavigate } from "react-router-dom";
import Signup from "../components/Signup/Signup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <Signup />
    </div>
  );
}

export default SignupPage;
