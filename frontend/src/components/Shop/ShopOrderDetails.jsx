import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersShop } from "../../features/order/orderThunks";
import { backendUrl, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

function ShopOrderDetails() {
  const { ordersShop } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller?._id));
  }, [dispatch, seller?._id]);

  const data = ordersShop && ordersShop.find((order) => order._id === id);

  const orderStatusUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        dispatch(getAllOrdersShop(seller?._id));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const refundStatusUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        dispatch(getAllOrdersShop(seller?._id));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

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
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Information:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Unpaid"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data && (
        <>
          {!["Refund Processing", "Refund Successful"].includes(
            data?.status
          ) ? (
            <select
              name=""
              id=""
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
            >
              {["Processing", "Shipped", "Delivered"]
                .slice(
                  ["Processing", "Shipped", "Delivered"].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          ) : (
            <select
              name=""
              id=""
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
            >
              {["Refund Processing", "Refund Successful"]
                .slice(
                  ["Refund Processing", "Refund Successful"].indexOf(
                    data?.status
                  )
                )
                .map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          )}
        </>
      )}

      <div
        className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
        onClick={
          data &&
          data?.status !== "Refund Processing" &&
          data?.status !== "Refund Successful"
            ? orderStatusUpdateHandler
            : refundStatusUpdateHandler
        }
      >
        Update Status
      </div>
    </div>
  );
}

export default ShopOrderDetails;
