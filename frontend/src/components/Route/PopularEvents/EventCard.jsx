/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import CountDown from "./CountDown.jsx";
import { AiOutlineArrowRight } from "react-icons/ai";

function EventCard({ active }) {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour
        </h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          cum quo debitis eligendi quas facere sapiente, mollitia nesciunt est,
          nobis non accusantium numquam repudiandae voluptate accusamus
          molestias, atque a perferendis? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Ex eius, necessitatibus temporibus magni
          officiis doloremque inventore provident sed similique vitae reiciendis
          suscipit dolorum aut consectetur, repudiandae assumenda tempora, quis
          tempore.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              $1099
            </h5>
            <h5 className="font-[500] text-[20px] text-[#333] font-Roboto">
              $999
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown />
        <div className="w-full flex justify-start space-x-10">
          <button
            className={`${styles.button} text-white mt-6 rounded-sm h-11 flex items-center`}
          >
            See Details
          </button>
          <button
            className={`${styles.button} text-white mt-6 rounded-sm h-11 flex items-center`}
          >
            Buy Now
          </button>
        </div>
        <div className="flex justify-end mt-6">
          <Link
            to="/"
            className="text-[#333] text-[17px] mr-3 flex items-center"
          >
            See More Events{" "}
            <AiOutlineArrowRight size={22} className="ml-1 mt-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
