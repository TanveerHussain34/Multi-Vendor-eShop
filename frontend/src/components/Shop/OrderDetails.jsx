import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersShop } from "../../features/order/orderThunks";
import { backendUrl } from "../../server";

function OrderDetails() {
  const { ordersShop } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller?._id));
  });

  const data = ordersShop && ordersShop.find((order) => order._id === id);

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard/all-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>
      <div className="w-full flex items center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed On: <span>{data?.createdAt.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      {data &&
        data.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5" key={index}>
            <img
              src={`${backendUrl}uploads/${item?.images[0]}`}
              alt=""
              className="w-[80px] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000084]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        ))}
      <div className="w-full border-t text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">
            Shipping Address: {data?.shippingAddress}
          </h4>
          <h4 className="pt-3 text-[20px]"></h4>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
