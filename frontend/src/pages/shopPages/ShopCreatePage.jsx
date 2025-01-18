import { useNavigate } from "react-router-dom";
import ShopCreate from "../../components/Shop/ShopCreate.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ShopCreatePage() {
  const navigate = useNavigate();
  const { isSellerAuthenticated } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSellerAuthenticated === true) {
      navigate(`/dashboard`, { replace: true });
    }
  });
  return (
    <div>
      <ShopCreate />
    </div>
  );
}

export default ShopCreatePage;
