import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar.jsx";
import CreateProduct from "../../components/Shop/CreateProduct.jsx";

function ShopCreateProduct() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={4} />
        </div>
        <div className="flex w-full justify-center">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
}

export default ShopCreateProduct;
