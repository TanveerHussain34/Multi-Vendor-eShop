import styles from "../../../styles/styles";

function Hero() {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover ${styles.normalFlex}`}
      style={{
        backgroundImage: "url(/hero_section_image.jpeg)",
      }}
    ></div>
  );
}

export default Hero;
