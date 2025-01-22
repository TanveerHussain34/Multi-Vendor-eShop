import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllCoupons from "../../components/Shop/AllCoupons.jsx";

function ShopAllCoupons() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={9} />
        </div>
        <div className="flex w-full justify-center items-start">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
}

export default ShopAllCoupons;
