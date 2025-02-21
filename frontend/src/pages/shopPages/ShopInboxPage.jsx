import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import DashboardMessages from "../../components/Shop/DashboardMessages.jsx";

function ShopInboxPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={8} />
        </div>
        <div className="flex w-full justify-center">
          <DashboardMessages />
        </div>
      </div>
    </div>
  );
}

export default ShopInboxPage;
