import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Cart({ setOpenCart }) {
  const cartData = [
    {
      name: "Product 1",
      description: "Product 1 description",
      price: 100,
    },
    {
      name: "Product 2",
      description: "Product 2 description",
      price: 200,
    },
    {
      name: "Product 3",
      description: "Product 3 description",
      price: 300,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              onClick={() => setOpenCart(false)}
              className="cursor-pointer"
            />
          </div>
          {/* items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cartData.length} Items
            </h5>
          </div>
          {/* cart single item */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
        <div className="px-5 mb-3">
          {/* checkout button */}
          <Link to="/checkout">
            <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]">
              <h1 className="text-white text-[18px] font-[600]">
                Checkout Now (US$1080)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] cursor-pointer flex items-center justify-center ${styles.normalFlex}`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} className="text-white" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className={`bg-[#a7abb14f] border rounded-full w-[25px] h-[25px] cursor-pointer flex items-center justify-center ${styles.normalFlex}`}
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} className="text-[#7d879c]" />
          </div>
        </div>
        <img
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h3 className="font-[400] text-[15px] text-[#00000082]">
            {data.description}
          </h3>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Cart;