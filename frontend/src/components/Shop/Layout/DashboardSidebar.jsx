/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

function DashboardSidebar({ active }) {
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard"
          className={`w-full flex items-center ${
            active === 1 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <RxDashboard size={30} className={`pl-2 text-[18px] font-[400]`} />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/orders"
          className={`w-full flex items-center ${
            active === 2 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <FiShoppingBag size={30} className={`pl-2 text-[18px] font-[400]`} />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/all-products"
          className={`w-full flex items-center ${
            active === 3 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <FiPackage size={30} className={`pl-2 text-[18px] font-[400]`} />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/create-product"
          className={`w-full flex items-center ${
            active === 4 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <AiOutlineFolderAdd
            size={30}
            className={`pl-2 text-[18px] font-[400]`}
          />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            Create Product
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/all-events"
          className={`w-full flex items-center ${
            active === 5 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <MdOutlineLocalOffer
            size={30}
            className={`pl-2 text-[18px] font-[400]`}
          />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/create-event"
          className={`w-full flex items-center ${
            active === 6 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <VscNewFile size={30} className={`pl-2 text-[18px] font-[400]`} />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            Create Event
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/withdraw-money"
          className={`w-full flex items-center ${
            active === 7 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <CiMoneyBill size={30} className={`pl-2 text-[18px] font-[400]`} />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/messages"
          className={`w-full flex items-center ${
            active === 8 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <BiMessageSquareDetail
            size={30}
            className={`pl-2 text-[18px] font-[400]`}
          />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/coupons"
          className={`w-full flex items-center ${
            active === 9 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <AiOutlineGift size={30} className={`pl-2 text-[18px] font-[400]`} />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            Coupon Codes
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/refunds"
          className={`w-full flex items-center ${
            active === 10 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <HiOutlineReceiptRefund
            size={30}
            className={`pl-2 text-[18px] font-[400]`}
          />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            Refunds
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/settings"
          className={`w-full flex items-center ${
            active === 11 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <CiSettings size={30} className={`pl-2 text-[18px] font-[400]`} />
          <h5 className={`pl-2 text-[18px] font-[400] hidden 800px:block`}>
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
}

export default DashboardSidebar;
