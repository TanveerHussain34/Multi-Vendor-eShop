import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersUser } from "../../features/order/orderThunks";

function TrackOrder() {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllOrdersUser(user?._id));
  }, [dispatch, user?._id]);

  const data = orders && orders.find((order) => order?._id === id);
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      {data && data?.status === "Processing" ? (
        <h1 className="text-[20px]">
          Your order is being processed for shipping at shop.
        </h1>
      ) : data && data?.status === "Shipped" ? (
        <h1 className="text-[20px]">
          Your order is shipped from our shop for delivery.
        </h1>
      ) : data && data?.status === "Delivered" ? (
        <h1 className="text-[20px]">
          Your order is successfully delivered by our delivery partner.
        </h1>
      ) : data && data?.status === "Refund Processing" ? (
        <h1 className="text-[20px]">
          Your order refund is processing by our shop.
        </h1>
      ) : data && data?.status === "Refund Successful" ? (
        <h1 className="text-[20px]">
          Your order is refunded successfully by our shop.
        </h1>
      ) : null}
    </div>
  );
}

export default TrackOrder;
