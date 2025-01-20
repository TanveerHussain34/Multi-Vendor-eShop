import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar.jsx";

function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={1} />
        </div>
        <div className="flex w-full justify-center">{/* <Dashboard /> */}</div>
      </div>
    </div>
  );
}

export default ShopDashboardPage;
