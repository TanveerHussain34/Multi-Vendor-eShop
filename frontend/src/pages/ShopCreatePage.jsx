import { useNavigate } from "react-router-dom";
import ShopCreate from "../components/Shop/ShopCreate.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ShopCreatePage() {
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
      <ShopCreate />
    </div>
  );
}

export default ShopCreatePage;
