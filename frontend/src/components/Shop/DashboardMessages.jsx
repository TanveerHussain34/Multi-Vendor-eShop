import { useSelector } from "react-redux";
import { backendUrl } from "../../server";

function DashboardMessages() {
  return (
    <div className="w-full bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      <h5 className="text-center text-[30px] font-Poppins py-3">
        All Messages
      </h5>

      {/* All messages list */}
      <MessageList />
    </div>
  );
}

const MessageList = () => {
  const seller = useSelector((state) => state.seller.seller);
  return (
    <div className="w-full flex p-3 px-3 bg-[#cbeaf030]">
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

export default DashboardMessages;
