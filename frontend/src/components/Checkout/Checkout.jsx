/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { Country, City } from "country-state-city";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

function Checkout() {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please provide your complete address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shippingPrice,
        discountPrice,
        shippingAddress,
        user,
      };
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shippingPrice = subTotalPrice * 0.1; // 10% of price without shipping charges

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;
    await axios
      .get(`${server}/couponCode/get-coupon-value/${name}`)
      .then((res) => {
        const shopId = res.data.couponCode?.shopId;
        const couponCodeValue = res.data.couponCode?.value;
        if (res.data.couponCode !== null) {
          const isCouponValid =
            cart && cart.filter((item) => item.shopId === shopId);
          if (isCouponValid.length === 0) {
            toast.error("Coupon code is not valid for this shop!");
            setCouponCode("");
          } else {
            const eligiblePrice = isCouponValid.reduce(
              (acc, item) => acc + item.qty * item.discountPrice,
              0
            );
            setDiscountPrice((eligiblePrice * couponCodeValue) / 100);
            setCouponCodeData(res.data.couponCode);
            setCouponCode("");
          }
        }
        if (couponCode === null) {
          toast.error("Invalid coupon code!");
        }
      });
  };

  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shippingPrice - discountPercentage).toFixed(2)
    : (subTotalPrice + shippingPrice).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shippingPrice={shippingPrice}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
}

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3 gap-3">
          <div className="w-[50%]">
            <label htmlFor="name" className="block pb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={user && user.name}
              required
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="email" className="block pb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3 gap-3">
          <div className="w-[50%]">
            <label htmlFor="phoneNumber" className="block pb-2">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              required
              value={user && user.phoneNumber}
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="zipCode" className="block pb-2">
              Zip Code
            </label>
            <input
              type="number"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3 gap-3">
          <div className="w-[50%]">
            <label htmlFor="country" className="block pb-2">
              Country
            </label>
            <select
              id="country"
              className="w-full border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Select country
              </option>
              {Country &&
                Country.getAllCountries().map((i, index) => (
                  <option key={index} value={i.isoCode} className="block pb-2">
                    {i.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-[50%]">
            <label htmlFor="city" className="block pb-2">
              City
            </label>
            <select
              id="city"
              className="w-full border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Select city
              </option>
              {City &&
                City.getCitiesOfCountry(country).map((i, index) => (
                  <option key={index} value={i.isoCode} className="block pb-2">
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3 gap-3">
          <div className="w-[50%]">
            <label htmlFor="address1" className="block pb-2">
              Address1
            </label>
            <input
              type="text"
              id="address1"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="address2" className="block pb-2">
              Address2
            </label>
            <input
              type="text"
              id="address2"
              required
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className={`${styles.input}`}
            />
          </div>
        </div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block text-blue-500 mt-3"
        onClick={() => setUserInfo(!userInfo)}
      >
        Use saved address instead?
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1" key={index}>
                <input
                  type="radio"
                  name="address"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
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
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Shipping Charges:
        </h3>
        <h5 className="text-[18px] font-[600]">${shippingPrice?.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentage ? "$" + discountPercentage.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
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

export default Checkout;
