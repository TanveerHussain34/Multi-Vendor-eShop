import { useSelector } from "react-redux";
import { backendUrl } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";

function ShopSettings() {
  const { seller } = useSelector((state) => state.seller);

  const handleImageChange = async () => {
    // const file = e.target.files[0];
    // const formData = new FormData();
    // formData.append("image", file);
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   withCredentials: true,
    // };
    // await axios
    //   .put(`${server}/user/update-user-avatar`, formData, config)
    //   .then(() => {
    //     toast.success("Avatar updated successfully");
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     toast.error(error?.response?.data?.message);
    //   });
  };

  const handleSubmit = async () => {};
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full 800px:w-[80%] flex flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={`${backendUrl}${seller?.avatar?.url}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full object-contain border-[3px] border-[#3ad132]"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[12px]">
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

        {/* shop info */}
        <form
          aria-required={true}
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
        >
          <div className="w-full 800px:w-[50%] pb-3 px-2 800px:px-0 mt-5">
            <label htmlFor="name" className="block pb-2">
              Shop Name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder={`${seller?.name}`}
              className={`${styles.input}`}
              value={`${seller?.name}`}
              onChange={() => {}}
            />
          </div>

          <div className="w-full 800px:w-[50%] pb-3 px-2 800px:px-0 mt-5">
            <label htmlFor="description" className="block pb-2">
              Shop Description
            </label>
            <input
              type="text"
              id="description"
              required
              placeholder={`${
                seller?.description
                  ? seller?.description
                  : "Enter shop description"
              }`}
              className={`${styles.input}`}
              value={`${seller?.description ? seller?.description : ""}`}
              onChange={() => {}}
            />
          </div>

          <div className="w-full 800px:w-[50%] pb-3 px-2 800px:px-0 mt-5">
            <label htmlFor="address" className="block pb-2">
              Shop Address
            </label>
            <input
              type="text"
              id="address"
              required
              placeholder={`${
                seller?.address ? seller?.address : "Enter shop address"
              }`}
              className={`${styles.input}`}
              value={`${seller?.name}`}
              onChange={() => {}}
            />
          </div>

          <div className="w-full 800px:w-[50%] pb-3 px-2 800px:px-0 mt-5">
            <label htmlFor="phoneNumber" className="block pb-2">
              Shop Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              required
              placeholder={`${
                seller?.phoneNumber
                  ? seller?.phoneNumber
                  : "Enter shop phone number"
              }`}
              className={`${styles.input}`}
              value={`${seller?.name}`}
              onChange={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopSettings;
