import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllOrders from "../../components/Shop/AllOrders.jsx";

function ShopOrderDetails() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={2} />
        </div>
        <div className="flex w-full justify-center items-start">
          <AllOrders />
        </div>
      </div>
    </div>
  );
}

export default ShopOrderDetails;
