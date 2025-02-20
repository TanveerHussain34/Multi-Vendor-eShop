import { useDispatch, useSelector } from "react-redux";
import { backendUrl, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../features/seller/sellerThunks";
import { useState } from "react";

function ShopSettings() {
  const { seller } = useSelector((state) => state.seller);
  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || null);
  const [zipCode, setZipCode] = useState(seller?.zipCode || null);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, config)
      .then(() => {
        toast.success("Avatar updated successfully");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const updateHandler = (e) => {
    e.preventDefault();

    axios
      .put(
        `${server}/shop/update-shop-profile`,
        { name, description, address, phoneNumber, zipCode },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Shop updated successfully");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full 800px:w-[80%] flex flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={`${backendUrl}${seller?.avatar?.url}`}
              alt=""
              className="w-[150px] h-[150px] rounded-full object-contain border-[3px] border-[#3ad132]"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="image">
                <AiOutlineCamera className="cursor-pointer" />
              </label>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="w-full px-5">
          <form aria-required={true} onSubmit={updateHandler}>
            <div className="w-full block 800px:flex justify-between">
              <div className="w-full 800px:w-[48%] pb-3">
                <label htmlFor="name" className="block pb-2 pl-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder={seller?.name}
                  className={`${styles.input}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full 800px:w-[48%] pb-3">
                <label htmlFor="description" className="block pb-2 pl-1">
                  Shop Description
                </label>
                <input
                  type="text"
                  id="description"
                  placeholder={`${
                    seller?.description
                      ? seller?.description
                      : "Enter shop description"
                  }`}
                  className={`${styles.input}`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full block 800px:flex justify-between">
              <div className="w-full 800px:w-[48%] pb-3">
                <label htmlFor="address" className="block pb-2 pl-1">
                  Shop Address
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  placeholder={`${seller?.address}`}
                  value={address}
                  className={`${styles.input}`}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="w-full 800px:w-[48%] pb-3">
                <label htmlFor="phoneNumber" className="block pb-2 pl-1">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  required
                  placeholder={`${seller?.phoneNumber}`}
                  value={phoneNumber}
                  className={`${styles.input}`}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full block 800px:flex justify-between">
              <div className="w-full 800px:w-[48%] pb-3">
                <label htmlFor="zipCode" className="block pb-2 pl-1">
                  Zip Code
                </label>
                <input
                  type="number"
                  id="zipCode"
                  required
                  placeholder={`${seller?.zipCode}`}
                  value={zipCode}
                  className={`${styles.input}`}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="w-full 800px:w-[48%] pb-3">
                <label htmlFor="password" className="block pb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={`${styles.input}`}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <input
                type="submit"
                className="w-full 800px:w-[48%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded mt-8 cursor-pointer"
                value={`Update Shop`}
                required
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShopSettings;
