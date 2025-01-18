/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isSellerAuthenticated, isLoading } = useSelector(
    (state) => state.seller
  );

  if (isLoading) {
    return <Loader />;
  } else {
    if (!isSellerAuthenticated) {
      navigate(`/shop-login`, { replace: true });
    }
    return children;
  }
};

export default SellerProtectedRoute;
