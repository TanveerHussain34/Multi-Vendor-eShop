/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

function DropDown({ categoriesData, setDropDown }) {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              alt=""
              className="w-[25px] h-[25px] ml-[10px] select-none object-contain"
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
}

export default DropDown;
