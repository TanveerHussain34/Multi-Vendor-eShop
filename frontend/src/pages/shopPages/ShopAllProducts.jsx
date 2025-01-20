import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllProducts from "../../components/Shop/AllProducts.jsx";

function ShopAllProducts() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={3} />
        </div>
        <div className="flex w-full justify-center items-start">
          <AllProducts />
        </div>
      </div>
    </div>
  );
}

export default ShopAllProducts;
