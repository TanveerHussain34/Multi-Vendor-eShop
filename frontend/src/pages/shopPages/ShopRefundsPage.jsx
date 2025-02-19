import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllRefunds from "../../components/Shop/AllRefunds.jsx";

function ShopRefundsPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={10} />
        </div>
        <div className="flex w-full justify-center items-start">
          <AllRefunds />
        </div>
      </div>
    </div>
  );
}

export default ShopRefundsPage;
