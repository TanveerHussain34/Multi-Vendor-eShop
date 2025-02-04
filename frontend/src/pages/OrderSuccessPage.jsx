import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Lottie from "react-lottie";
import animationData from "../assets/animations/Animation - 1738662406625.json";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  useEffect(() => {
    window.scrollTo(top);
  });
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={250} height={250} />
      <h5 className="text-center mb-10 text-[25px]">
        Order posted successfully!
      </h5>
    </div>
  );
};

export default OrderSuccessPage;
