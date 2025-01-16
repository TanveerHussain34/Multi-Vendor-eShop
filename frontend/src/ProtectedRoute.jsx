/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
