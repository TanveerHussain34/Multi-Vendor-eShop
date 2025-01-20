import { useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

/* eslint-disable react/prop-types */
function ShopProfileData({ isOwner }) {
  const [active, setActive] = useState(1);
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div
                  className={`${styles.button} cursor-pointer !mt-0 !rounded-[4px] !h-[42px]`}
                >
                  <span className="text-white">Go to Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />

      <div
        className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0 ${
          active === 1 ? "block" : "hidden"
        }`}
      >
        {productData &&
          productData.map((i, index) => <ProductCard key={index} data={i} />)}
      </div>

      <div>
        {active === 2 && (
          <div className="min-h-[200px] w-full text-gray-400 flex items-center justify-center">
            No events found!
          </div>
        )}
      </div>

      <div>
        {active === 3 && (
          <div className="min-h-[200px] w-full text-gray-400 flex items-center justify-center">
            No reviews found!
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopProfileData;
