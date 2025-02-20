import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import ShopSettings from "../../components/Shop/ShopSettings.jsx";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar.jsx";

function ShopSettingsPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={11} />
        </div>
        <div className="flex w-full justify-center">
          <ShopSettings />
        </div>
      </div>
    </div>
  );
}

export default ShopSettingsPage;
