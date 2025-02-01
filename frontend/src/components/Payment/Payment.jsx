/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { Country, City } from "country-state-city";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

function Payment() {
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData />
        </div>
      </div>
    </div>
  );
}

const PaymentInfo = () => {
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const paymentHandler = (e) => {
    e.preventDefault();
    navigate("/order/success/fdk4j5kfj4");
  };
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
                  <label htmlFor="cardNumber" className="block pb-2">
                    Card Number
                  </label>
                  <input
                    type="number"
                    name="cardNumber"
                    required
                    className={`${styles.input}`}
                  />
                </div>
                <div className="w-[50%]">
                  <label htmlFor="expiryDate" className="block pb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    required
                    className={`${styles.input}`}
                  />
                </div>
              </div>
              <div className="w-full flex pb-3 gap-3">
                <div className="w-[50%]">
                  <label htmlFor="titleOnCard" className="block pb-2">
                    Title on Card
                  </label>
                  <input
                    type="text"
                    name="titleOnCard"
                    required
                    className={`${styles.input}`}
                  />
                </div>
                <div className="w-[50%]">
                  <label htmlFor="billingAddress" className="block pb-2">
                    Billing Address
                  </label>
                  <input
                    type="text"
                    name="billingAddress"
                    required
                    className={`${styles.input}`}
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
      {/* paypal payment */}
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

      {/* pay with card */}
      {select === 3 && (
        <div className="w-full flex">
          <form className="w-full" onSubmit={paymentHandler}>
            <input
              type="submit"
              value="Submit"
              className={`${styles.button} w-[50%] !bg-[#f63b60] text-white !h-[40px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            />
          </form>
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shippingPrice,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Total Price:
        </h3>
        {/* <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5> */}
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Shipping Charges:
        </h3>
        {/* <h5 className="text-[18px] font-[600]">${shippingPrice.toFixed(2)}</h5> */}
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {/* - {discountPercentage ? "$" + discountPercentage.toString() : null} */}
        </h5>
      </div>
      {/* <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5> */}
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          //   value={couponCode}
          //   onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Payment;
