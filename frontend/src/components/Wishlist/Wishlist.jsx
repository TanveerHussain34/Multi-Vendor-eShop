import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

/* eslint-disable react/prop-types */
function Wishlist({ setOpenWishlist }) {
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
              onClick={() => setOpenWishlist(false)}
              className="cursor-pointer"
            />
          </div>
          {/* items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <AiFillHeart size={25} color="red" />
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
        <RxCross1 className="cursor-pointer" />
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

          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to Cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
