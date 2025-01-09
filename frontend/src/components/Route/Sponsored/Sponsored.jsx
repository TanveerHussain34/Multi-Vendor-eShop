import styles from "../../../styles/styles";

function Sponsored() {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Sponsored;
