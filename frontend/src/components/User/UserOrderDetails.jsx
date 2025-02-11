import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersUser } from "../../features/order/orderThunks";
import { backendUrl, server } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

function UserOrderDetails() {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getAllOrdersUser(user?._id));
  }, [dispatch, user?._id]);

  const data = orders && orders.find((order) => order?._id === id);

  const reviewHandler = async () => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        dispatch(getAllOrdersUser(user?._id));
        setComment("");
        setRating(1);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>
      <div className="w-full flex items center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed On: <span>{data?.createdAt.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      {data &&
        data.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5" key={index}>
            <img
              src={`${backendUrl}uploads/${item?.images[0]}`}
              alt=""
              className="w-[80px] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000084]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
            {!item.isReviewed && item.status === "Delivered" && (
              <div
                className={`${styles.button} text-white`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Give a Review
              </div>
            )}
          </div>
        ))}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-[90vh] bg-white shadow rounded-md p-3 overflow-y-scroll overflow-x-hidden">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex ml-3">
              <img
                src={`${backendUrl}uploads/${selectedItem?.images[0]}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div>
                <div className="pl-3 mt-1 text-[20px]">
                  {selectedItem?.name}
                </div>
                <h4 className="pl-3 text-[20px]">
                  US${selectedItem?.discountPrice}
                </h4>
              </div>
            </div>
            <br />
            {/* ratings */}
            <h5 className="pl-3 mt-1 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>{" "}
            </h5>
            <div className="flex w-full ml-2 pt-">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    size={25}
                    color="rgb(246, 186, 0)"
                    className="mr-1 cursor-pointer"
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    size={25}
                    color="rgb(246, 186, 0)"
                    className="mr-1 cursor-pointer"
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label htmlFor="" className="block text-[20px] font-[500]">
                Write a Comment
                <span className="ml-2 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                rows={5}
                cols={20}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How is the product? Please describe here.."
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div className="flex  justify-end">
              <div
                className={`${styles.button} text-white text-[20px] ml-3`}
                onClick={reviewHandler}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full border-t text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Information:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Unpaid"}
          </h4>
        </div>
      </div>
      <Link to={`/`}>
        <div className={`${styles.button} text-white`}>Send Message</div>
      </Link>
      <br />
      <br />
    </div>
  );
}

export default UserOrderDetails;
