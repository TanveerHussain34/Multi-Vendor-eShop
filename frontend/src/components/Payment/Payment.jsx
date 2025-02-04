/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

function Payment() {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const onCreateOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Paypal Integration",
            amount: { currency_code: "USD", value: orderData?.totalPrice },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApproveOrder = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;
      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = { headers: { "Content-Type": "application/json" } };
    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };
    await axios.post(`${server}/order/create-order`, order, config).then(() => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };
          await axios
            .post(`${server}/order/create-order`, order, config)
            .then(() => {
              setOpen(false);
              navigate("/order/success");
              toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    order.paymentInfo = {
      type: "Cash on Delivery",
    };
    await axios.post(`${server}/order/create-order`, order, config).then(() => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApproveOrder={onApproveOrder}
            onCreateOrder={onCreateOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
}

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApproveOrder,
  onCreateOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="w-full flex pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 && (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            )}
          </div>
          <h5
            className="text-[18px] text-[#000000b1] font-[600] pl-2 cursor-pointer"
            onClick={() => setSelect(1)}
          >
            Pay with Debit/Credit Card
          </h5>
        </div>
        {/* pay with card */}
        {select === 1 && (
          <div className="w-full flex border-b">
            <form onSubmit={paymentHandler} className="w-full">
              <div className="w-full flex pb-3 gap-3">
                <div className="w-[50%]">
                  <label htmlFor="title" className="block pb-2">
                    Card Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={user && user.name}
                    readOnly
                    required
                    className={`${styles.input} text-[#444]`}
                  />
                </div>
                <div className="w-[50%]">
                  <label htmlFor="expiryDate" className="block pb-2">
                    Expiry Date
                  </label>
                  <CardExpiryElement
                    className={`${styles.input} !h-[33.3333px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex pb-3 gap-3">
                <div className="w-[50%]">
                  <label htmlFor="titleOnCard" className="block pb-2">
                    Card Number
                  </label>
                  <CardNumberElement
                    className={`${styles.input} !h-[33.3333px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label htmlFor="billingAddress" className="block pb-2">
                    CVC
                  </label>
                  <CardCvcElement
                    className={`${styles.input} !h-[33.3333px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <input
                  type="submit"
                  value="Submit"
                  className={`${styles.button} w-[50%] !bg-[#f63b60] text-white !h-[40px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                />
              </div>
            </form>
          </div>
        )}
      </div>

      <br />
      {/* pay with paypal */}
      <div>
        <div className="w-full flex pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 && (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            )}
          </div>
          <h5
            className="text-[18px] text-[#000000b1] font-[600] pl-2 cursor-pointer"
            onClick={() => setSelect(2)}
          >
            Pay with Paypal
          </h5>
        </div>

        {/* Pay with paypal */}
        {select === 2 && (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shodow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "ATByQoz9CE159JFsffXM3kp50HEG81cxILgZyBLyUBXOEDPu-G6pZpLrGa5iEL2l0pYv1uaXKsaXEGGL",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={(data, actions) =>
                        onApproveOrder(data, actions)
                      }
                      createOrder={(data, actions) =>
                        onCreateOrder(data, actions)
                      }
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <br />
      {/* cash on delivery */}
      <div>
        <div className="w-full flex">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 && (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            )}
          </div>
          <h5
            className="text-[18px] text-[#000000b1] font-[600] pl-2 pb-[12px] cursor-pointer"
            onClick={() => setSelect(3)}
          >
            Cash on Delivery
          </h5>
        </div>
      </div>

      {/* cash on delivery */}
      {select === 3 && (
        <div className="w-full flex">
          <form className="w-full" onSubmit={cashOnDeliveryHandler}>
            <input
              type="submit"
              value="Confirm"
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            />
          </form>
        </div>
      )}
    </div>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Total Price:
        </h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Shipping Charges:
        </h3>
        <h5 className="text-[18px] font-[600]">
          ${orderData?.shippingPrice?.toFixed(2)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {orderData?.discountPrice ? `$${orderData.discountPrice}` : ""}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
    </div>
  );
};

export default Payment;
