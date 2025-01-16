import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ShopLoginPage() {
  const navigate = useNavigate();
  const { isSellerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isSellerAuthenticated === true) {
      navigate(`/shop/${seller?.id}`, { replace: true });
    }
  });
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
