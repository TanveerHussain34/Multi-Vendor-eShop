/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { backendUrl } from "../../../server.js";
import Ratings from "../../Products/Ratings.jsx";
import { addToCartThunk } from "../../../features/cart/cartThunks.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../../../features/wishlist/wishlistThunks.js";

function ProductCard({ data, isEvent }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlist) {
      if (wishlist && wishlist.find((i) => i._id === data._id)) {
        setClick(true);
      } else {
        setClick(false);
      }
    }
  }, [wishlist, data._id]);

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error(`Product stock is limited!`);
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCartThunk(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlistThunk(data));
    toast.success("Item added to wishlist successfully!");
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlistThunk(data));
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link
          to={
            isEvent
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }
        >
          <img
            src={`${backendUrl}uploads/${data.images[0]}`} // will change while using cloudinary
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link
          to={
            isEvent
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }
        >
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
            <Ratings ratings={data.ratings} />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? "$" + data.originalPrice
                  : "$" + data.discountPrice}
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? "$" + data.originalPrice : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.soldOut ? data.soldOut + " sold" : null}
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from Wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to Wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="absolute cursor-pointer right-2 top-14"
            onClick={() => setOpen(!open)}
            color={"#333"}
            title="Quick View"
          />
          <AiOutlineShoppingCart
            size={25}
            className="absolute cursor-pointer right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color={"#444"}
            title="Add to Cart"
          />
          {open ? (
            <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
