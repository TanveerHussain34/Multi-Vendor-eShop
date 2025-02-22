/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backendUrl, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../features/product/productThunks";
import { toast } from "react-toastify";
import { addToCartThunk } from "../../features/cart/cartThunks";
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../../features/wishlist/wishlistThunks";
import Ratings from "./Ratings";
import axios from "axios";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getAllProductsShop(data && data.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, dispatch, wishlist]);

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/conversation/${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } else {
      toast.error("Please login to send message!");
    }
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error(`Product stock is limited!`);
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCartThunk(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, prodcut) => acc + prodcut.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, prodcut) =>
        acc + prodcut.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avgRatings = parseFloat(
    (totalRatings / totalReviewsLength || 0).toFixed(1)
  );

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlistThunk(data));
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlistThunk(data));
  };

  console.log(data?.shop?.avatar?.url);
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex gap-3">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backendUrl}uploads/${data?.images[select]}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full grid grid-cols-3 gap-3">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === index ? "border" : "null"
                        } cursor-pointer`}
                        key={index}
                      >
                        <img
                          src={`${backendUrl}uploads/${i}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ${data.discountPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? "$" + data.originalPrice : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[9.5px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from Wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to Wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 !rounded h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className={`flex items-center pt-8`}>
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backendUrl}${data?.shop?.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} !pb-0`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className={`pb-3 text-[15px]`}>
                      ({avgRatings}/5) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ProductDetailsInfo
              data={data}
              products={products}
              totalReviewsLength={totalReviewsLength}
              avgRatings={avgRatings}
            />
            <br />
            <br />
          </div>
        </div>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  avgRatings,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={`text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] min-h-[40vh] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2" key={index}>
                <img
                  src={`${backendUrl}${item?.user?.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div>
                  <div className="w-full flex items-center">
                    <h4 className="font-[500] mr-3">{item?.user?.name}</h4>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p className="text-[15px]">{item?.comment}</p>
                </div>
                <p className="text-[15px]">{item?.review}</p>
              </div>
            ))}
          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5 className="text-[15px]">No reviews yet!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 ? (
        <div className="w-full min-h-[40vh] block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex">
              <div className={`flex items-center`}>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <img
                    src={`${backendUrl}${data?.shop?.avatar?.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </Link>
                <div className="pr-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <h3 className={`${styles.shop_name} !pb-0`}>
                      {data.shop.name}
                    </h3>
                  </Link>
                  <h5 className={`pb-3 text-[15px]`}>
                    {/* ({data.shop.ratings}) Ratings */}({avgRatings}/5)
                    Ratings
                  </h5>
                </div>
              </div>
              <div
                className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                // onClick={handleMessageSubmit}
              >
                <span className="text-white flex items-center">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>
            </div>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined On:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                {/* Total Reviews: <span className="font-[500]">{totalReviewsLength}</span> */}
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
