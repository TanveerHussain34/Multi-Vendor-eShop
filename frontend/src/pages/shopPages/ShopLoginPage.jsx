import { useNavigate } from "react-router-dom";
import ShopLogin from "../../components/Shop/ShopLogin.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ShopLoginPage() {
  const navigate = useNavigate();
  const { isSellerAuthenticated, isLoading } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isSellerAuthenticated === true) {
      navigate(`/dashboard`, { replace: true });
    }
  }, [isLoading, isSellerAuthenticated, navigate]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
