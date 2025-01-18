import Lottie from "react-lottie";
import animationData from "../../assets/animations/Animation - 1737207220382.json";

function Loader() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}

export default Loader;
