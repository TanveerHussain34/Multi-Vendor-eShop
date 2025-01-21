import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllEvents from "../../components/Shop/AllEvents.jsx";

function ShopAllEvents() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={5} />
        </div>
        <div className="flex w-full justify-center items-start">
          <AllEvents />
        </div>
      </div>
    </div>
  );
}

export default ShopAllEvents;
