import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backendUrl } from "../../../server";

function DashboardHeader() {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/coupons" className="hidden 800px:block">
            <AiOutlineGift
              size={30}
              className="mx-5 cursor-pointer text-[#555]"
            />
          </Link>
          <Link to="/dashboard/events" className="hidden 800px:block">
            <MdOutlineLocalOffer
              size={30}
              className="mx-5 cursor-pointer text-[#555]"
            />
          </Link>
          <Link to="/dashboard/products" className="hidden 800px:block">
            <FiShoppingBag
              size={30}
              className="mx-5 cursor-pointer text-[#555]"
            />
          </Link>
          <Link to="/dashboard/orders" className="hidden 800px:block">
            <FiPackage size={30} className="mx-5 cursor-pointer text-[#555]" />
          </Link>
          <Link to="/dashboard/messages" className="hidden 800px:block">
            <BiMessageSquareDetail
              size={30}
              className="mx-5 cursor-pointer text-[#555]"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${backendUrl}${seller.avatar.url}`}
              alt=""
              className="w-[35px] h-[35px] rounded-full object-contain bg-white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
