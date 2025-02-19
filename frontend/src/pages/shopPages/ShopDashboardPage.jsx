import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar.jsx";
import DashboardHero from "../../components/Shop/Layout/DashboardHero.jsx";

function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={1} />
        </div>
        <DashboardHero />
      </div>
    </div>
  );
}

export default ShopDashboardPage;
