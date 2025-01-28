import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlistThunk } from "../../features/wishlist/wishlistThunks";
import { addToCartThunk } from "../../features/cart/cartThunks.js";
import { backendUrl } from "../../server";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
function Wishlist({ setOpenWishlist }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlistThunk(data));
  };

  const addToCartHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      const newData = { ...data, qty: 1 };
      dispatch(addToCartThunk(newData));
      dispatch(removeFromWishlistThunk(data));
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length > 0 ? (
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
                {wishlist && wishlist.length} Items
              </h5>
            </div>
            {/* cart single item */}
            <br />
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-0 right-0">
              <RxCross1
                size={25}
                onClick={() => setOpenWishlist(false)}
                className="cursor-pointer"
              />
            </div>
            <h5>Wishlist is empty!</h5>
          </div>
        )}
      </div>
    </div>
  );
}

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromWishlistHandler(data)}
          title="Remove from Wishlist"
        />
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

          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
            US${data.discountPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            onClick={() => addToCartHandler(data)}
            className="cursor-pointer"
            title="Add to Cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
