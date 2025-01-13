/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=507jdjh4k48fghk3487");
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] min-h-screen`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data?.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : null
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : null
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ${data.discount_price}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? "$" + data.price : null}
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
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from Wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add to Wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 !rounded h-11 flex items-center`}
                >
                  <span className="text-white flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className={`flex items-center pt-8`}>
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className={`pb-3 text-[15px]`}>
                      ({data.shop.ratings}) Ratings
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
            <ProductDetailsInfo data={data} />
            <br />
            <br />
          </div>
        </div>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({ data }) => {
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
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            cumque, asperiores libero ut culpa delectus. Nobis deserunt quod ex
            expedita cumque libero quam at temporibus repellendus repudiandae,
            architecto placeat velit earum accusantium, neque labore explicabo
            ipsa nesciunt. Maxime inventore ipsum necessitatibus et veniam eius
            optio error commodi? Quos laborum veritatis libero, pariatur
            voluptates nihil rem, sapiente, dicta incidunt laboriosam at quasi!
            Laboriosam voluptate inventore id quasi sequi fugit deserunt
            doloribus voluptatum? Quis error labore asperiores, provident fuga
            cupiditate ea nemo dolor recusandae ratione consequuntur! Deleniti
            minima, dolores voluptate aut repellendus ut nesciunt beatae
            possimus voluptatum fugit asperiores, quos est repudiandae.
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            cumque, asperiores libero ut culpa delectus. Nobis deserunt quod ex
            expedita cumque libero quam at temporibus repellendus repudiandae,
            architecto placeat velit earum accusantium, neque labore explicabo
            ipsa nesciunt. Maxime inventore ipsum necessitatibus et veniam eius
            optio error commodi? Quos laborum veritatis libero, pariatur
            voluptates nihil rem, sapiente, dicta incidunt laboriosam at quasi!
            Laboriosam voluptate inventore id quasi sequi fugit deserunt
            doloribus voluptatum? Quis error labore asperiores, provident fuga
            cupiditate ea nemo dolor recusandae ratione consequuntur! Deleniti
            minima, dolores voluptate aut repellendus ut nesciunt beatae
            possimus voluptatum fugit asperiores, quos est repudiandae.
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            cumque, asperiores libero ut culpa delectus. Nobis deserunt quod ex
            expedita cumque libero quam at temporibus repellendus repudiandae,
            architecto placeat velit earum accusantium, neque labore explicabo
            ipsa nesciunt. Maxime inventore ipsum necessitatibus et veniam eius
            optio error commodi? Quos laborum veritatis libero, pariatur
            voluptates nihil rem, sapiente, dicta incidunt laboriosam at quasi!
            Laboriosam voluptate inventore id quasi sequi fugit deserunt
            doloribus voluptatum? Quis error labore asperiores, provident fuga
            cupiditate ea nemo dolor recusandae ratione consequuntur! Deleniti
            minima, dolores voluptate aut repellendus ut nesciunt beatae
            possimus voluptatum fugit asperiores, quos est repudiandae.
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No reviews yet!</p>
        </div>
      ) : null}

      {active === 3 ? (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className={`flex items-center`}>
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-[50px] h-[50px] rounded-full mr-2"
              />
              <div className="pr-8">
                <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                  {data.shop.name}
                </h3>
                <h5 className={`pb-3 text-[15px]`}>
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
              {/* <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div> */}
            </div>
            <p className="pt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Veritatis doloremque quos fugit cum reprehenderit eligendi
              doloribus eveniet aliquam iste saepe quod earum, velit hic
              pariatur non, natus nobis minima iusto!
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined On: <span className="font-[500]">Jan 13, 2025</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">1223</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">325</span>
              </h5>
              <Link to="/">
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
