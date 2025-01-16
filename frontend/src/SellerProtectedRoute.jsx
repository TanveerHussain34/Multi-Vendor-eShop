/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ isSellerAuthenticated, children }) => {
  if (!isSellerAuthenticated) {
    console.log(isSellerAuthenticated);
    return <Navigate to={`/shop-login`} replace />;
  }
  return children;
};

export default SellerProtectedRoute;
