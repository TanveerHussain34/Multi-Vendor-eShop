import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1661766077694-6e3750b0fb97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9vbSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)",
        backgroundPosition: "center 35%",
        transform: "scaleX(-1)",
      }}
    >
      <div
        className={`${styles.section} w-[90%] 800px:w-[60%]`}
        style={{ transform: "scaleX(-1)" }}
      >
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize">
          Best Collection for <br /> home decoration
        </h1>
        <p className="pt-5 text-[16px] font-Poppins font-[400] text-[#000000ba]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          dolorum, possimus
          <br /> quam suscipit quisquam adipisci nesciunt error consequuntur
          sunt alias eaque vitae
          <br /> impedit consequatur fugiat, quasi inventore ratione illo
          corrupti.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-white font-Poppins text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
