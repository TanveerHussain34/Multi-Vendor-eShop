import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllOrders from "../../components/Shop/AllOrders.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import OrderDetails from "../../components/Shop/OrderDetails.jsx";

function ShopOrderDetails() {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
}

export default ShopOrderDetails;
