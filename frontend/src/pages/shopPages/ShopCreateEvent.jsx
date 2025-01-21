import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import CreateEvent from "../../components/Shop/CreateEvent.jsx";

function ShopAllEvents() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={6} />
        </div>
        <div className="flex w-full justify-center">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
}

export default ShopAllEvents;
