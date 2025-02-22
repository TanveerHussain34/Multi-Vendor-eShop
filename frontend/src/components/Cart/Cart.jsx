import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl } from "../../server";
import {
  addToCartThunk,
  removeFromCartThunk,
} from "../../features/cart/cartThunks";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
function Cart({ setOpenCart }) {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCartThunk(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCartThunk(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {cart && cart.length > 0 ? (
          <>
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
                  {cart && cart.length} Items
                </h5>
              </div>

              {/* cart single item */}
              <div className="flex-1 overflow-y-auto scrollbar-hide max-h-[calc(100vh-175px)]">
                <div className="w-full border-t">
                  {cart &&
                    cart.map((i, index) => (
                      <CartSingle
                        key={index}
                        data={i}
                        quantityChangeHandler={quantityChangeHandler}
                        removeFromCartHandler={removeFromCartHandler}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="px-5 py-3 sticky bottom-0">
              {/* checkout button */}
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]">
                  <h1 className="text-white text-[18px] font-[600]">
                    Checkout Now (US${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-0 right-0">
              <RxCross1
                size={25}
                onClick={() => setOpenCart(false)}
                className="cursor-pointer"
              />
            </div>
            <h5>Cart is empty!</h5>
          </div>
        )}
      </div>
    </div>
  );
}

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error(`Product stock is limited!`);
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] cursor-pointer flex items-center justify-center ${styles.normalFlex}`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} className="text-white" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className={`bg-[#a7abb14f] border rounded-full w-[25px] h-[25px] cursor-pointer flex items-center justify-center ${styles.normalFlex}`}
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} className="text-[#7d879c]" />
          </div>
        </div>
        <img
          src={`${backendUrl}uploads/${data.images[0]}`}
          alt=""
          className="w-[80px] h-[80px] ml-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h3 className="font-[400] text-[15px] text-[#00000082]">
            {data.description}
          </h3>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
          title="Remove from Cart"
        />
      </div>
    </div>
  );
};

export default Cart;
