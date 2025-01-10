import styles from "../../../styles/styles";

function Sponsored() {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            className="w-[150px] object-contain"
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png"
            className="w-[150px] object-contain"
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/2560px-LG_logo_%282014%29.svg.png"
            className="w-[150px] object-contain"
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://www.pngkey.com/png/full/255-2551960_what-if-apple-discontinues-the-mac-product-line.png"
            className="w-[150px] object-contain"
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_1280.png"
            className="w-[150px] object-contain"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Sponsored;
