import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShop } from "../../features/order/orderThunks";
import styles from "../../styles/styles";

function WithdrawMoney() {
  const dispatch = useDispatch();
  const { ordersShop } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [deliveredOrders, setDeliveredOrders] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersShop(seller._id));

    const orderData =
      ordersShop && ordersShop.filter((item) => item.status === "Delivered");
    setDeliveredOrders(orderData);
  }, [dispatch, ordersShop, seller._id]);

  const totalEarningWithoutTax =
    deliveredOrders &&
    deliveredOrders?.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex flex-col items-center justify-center">
        <h5 className="text-[20px] pb-2">
          Available Balance: {availableBalance}
        </h5>
        <div className={`${styles.button} text-white !h-[40px] !rounded`}>
          Withdraw
        </div>
      </div>
    </div>
  );
}

export default WithdrawMoney;
