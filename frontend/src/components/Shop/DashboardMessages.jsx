/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { backendUrl, server } from "../../server";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";

function DashboardMessages() {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${server}/conversation/get-all-conversations-seller/${seller?._id}`,
        { withCredentials: true }
      )
      .then((res) => {
        setConversations(res?.data?.conversations);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [seller]);
  return (
    <div className="w-full bg-white m-5 h-[80vh] overflow-y-scroll scrollbar-hide rounded">
      {!open && (
        <>
          <h5 className="text-center text-[30px] font-Poppins py-3">
            All Messages
          </h5>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                key={index}
                data={item}
                index={index}
                setOpen={setOpen}
                seller={seller}
              />
            ))}
        </>
      )}
      {open && (
        <>
          <SellerInbox setOpen={setOpen} />
        </>
      )}
    </div>
  );
}

const MessageList = ({ data, index, setOpen }) => {
  const [active, setActive] = useState(0);
  const seller = useSelector((state) => state.seller.seller);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  return (
    <div
      className={`w-full flex p-3 px-3 cursor-pointer ${
        active === index ? "bg-[#cbeaf030]" : "bg-transparent"
      }`}
      onClick={() => setActive(index) || handleClick(data?._id)}
    >
      <div className="relative">
        <img
          src={`${backendUrl}${seller?.avatar?.url}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-1 right-0" />
      </div>
      <div className="ml-3">
        <h5 className="text-[18px]">{seller?.name}</h5>
        <p className="text-[16px] text-[#000c]">
          You: Hello, how can I help you?
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({ setOpen }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
  };
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-2 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src={`${backendUrl}uploads/j-1738866528030-773901159.png`}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-contain"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">Junaid Shop</h1>
            <h1>Active now</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          title="All messages"
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[58vh] py-2 overflow-y-scroll scrollbar-hide">
        <div className="w-full flex items-center my-2">
          <img
            src="http://localhost:8000/uploads/j-1738866528030-773901159.png"
            alt=""
            className="w-[40px] h-[40px] rounded-full object-contain border border-[#00000025]"
          />
          <div className="w-max p-2 bg-[#00000025] h-min rounded ml-2">
            <p>Hello there!</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-end my-2">
          <div className="w-max p-2 bg-[#82db9c9d] h-min rounded ml-2">
            <p>Hi, how are you?</p>
          </div>
        </div>
      </div>

      {/* send message input */}
      <form
        aria-required={true}
        onSubmit={handleSubmit}
        className="p-3 w-full relative flex items-center justify-between"
      >
        <div className="w-[3%]">
          <TfiGallery
            size={20}
            title="Upload files"
            className="mt-1 cursor-pointer"
          />
        </div>
        <div className="w-[97%]">
          <input
            type="text"
            placeholder="Type a message..."
            className={`${styles.input}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send" className="cursor-pointer">
            <AiOutlineSend
              size={25}
              title="Send message"
              className={`absolute right-4 top-4 cursor-pointer ${
                !message.trim()
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-500"
              }`}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
