/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import CountDown from "./CountDown.jsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import { backendUrl } from "../../../server.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk } from "../../../features/cart/cartThunks.js";

function EventCard({ active, data, moreEvents }) {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error(`Product stock is limited!`);
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCartThunk(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img src={`${backendUrl}uploads/${data?.images[0]}`} alt="" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              ${data?.originalPrice}
            </h5>
            <h5 className="font-[500] text-[20px] text-[#333] font-Roboto">
              ${data?.discountPrice}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.soldOut ? data.soldOut + " sold" : null}
          </span>
        </div>
        <CountDown data={data} />
        <div className="w-full flex justify-start space-x-10">
          <Link
            to={`/product/${data._id}?isEvent=true`}
            className={`${styles.button} text-white mt-6 rounded-sm h-11 flex items-center`}
          >
            See Details
          </Link>
          <button
            className={`${styles.button} text-white mt-6 rounded-sm h-11 flex items-center`}
            onClick={() => addToCartHandler(data._id)}
          >
            Add to Cart
          </button>
        </div>
        <div className={`flex justify-end mt-6 ${moreEvents ? "" : "hidden"}`}>
          <Link
            to="/events"
            className="text-[#333] text-[17px] mr-3 flex items-center"
          >
            See More Events{" "}
            <AiOutlineArrowRight size={22} className="ml-1 mt-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
