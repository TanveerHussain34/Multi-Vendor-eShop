/* eslint-disable react/prop-types */
import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineShoppingBag, HiReceiptRefund } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

function ProfileSidebar({ active, setActive }) {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : null} />
        <span className={`pl-3 ${active === 1 ? "text-[red]" : null}`}>
          Profile
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : null} />
        <span className={`pl-3 ${active === 2 ? "text-[red]" : null}`}>
          Orders
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiReceiptRefund size={20} color={active === 3 ? "red" : null} />
        <span className={`pl-3 ${active === 3 ? "text-[red]" : null}`}>
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : null} />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : null}`}>
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : null} />
        <span className={`pl-3 ${active === 5 ? "text-[red]" : null}`}>
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard size={20} color={active === 6 ? "red" : null} />
        <span className={`pl-3 ${active === 6 ? "text-[red]" : null}`}>
          Payment Methods
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : null} />
        <span className={`pl-3 ${active === 7 ? "text-[red]" : null}`}>
          Address
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : null} />
        <span className={`pl-3 ${active === 8 ? "text-[red]" : null}`}>
          Log out
        </span>
      </div>
    </div>
  );
}

export default ProfileSidebar;