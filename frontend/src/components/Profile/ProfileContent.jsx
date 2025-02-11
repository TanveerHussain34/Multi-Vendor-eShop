import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { backendUrl, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineTrackChanges } from "react-icons/md";
import {
  updateUserProfile,
  updateUserAddress,
  deleteUserAddress,
} from "../../features/user/userThunks";
import { Country, City } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { clearErrors, clearMessages } from "../../features/user/userSlice";
import { getAllOrdersUser } from "../../features/order/orderThunks";

/* eslint-disable react/prop-types */
function ProfileContent({ active }) {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState((user && user.name) || "");
  const [email, setEmail] = useState((user && user.email) || "");
  const [phoneNumber, setPhoneNumber] = useState(
    (user && user.phoneNumber) || ""
  );
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }
  }, [error, successMessage, dispatch]);

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
      .put(`${server}/user/update-user-avatar`, formData, config)
      .then(() => {
        toast.success("Avatar updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(name, email, phoneNumber, password));
  };

  return (
    <div className="w-full ">
      {/* Profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backendUrl}${user?.avatar.url}`}
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
            <form aria-required onSubmit={handleUpdateProfile}>
              <div className="w-full block 800px:flex justify-between">
                <div className="w-full 800px:w-[48%] pb-3">
                  <label htmlFor="name" className="block pb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`${styles.input}`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-full 800px:w-[48%] pb-3">
                  <label htmlFor="email" className="block pb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    className={`${styles.input}`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full block 800px:flex justify-between">
                <div className="w-full 800px:w-[48%] pb-3">
                  <label htmlFor="phoneNumber" className="block pb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className={`${styles.input}`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex justify-center">
                <input
                  className="w-full 800px:w-[48%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded mt-8 cursor-pointer"
                  required
                  value="Update Profile"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </>
      )}

      {/* Orders */}
      {active == 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refunds */}
      {active == 3 && (
        <div>
          <AllRefunds />
        </div>
      )}

      {/* Track Order */}
      {active == 5 && (
        <div>
          <TrackOrders />
        </div>
      )}

      {/* Change Password */}
      {active == 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/* Address */}
      {active == 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
}

const AllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch, user._id]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered"
          ? "text-green-600"
          : "text-yellow-600";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="flex flex-col pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </div>
  );
};

const AllRefunds = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "IPhone 14 Pro Max",
        },
      ],
      totalPrice: 350,
      orderStatus: "Processing",
    },
    {
      _id: "7463hvbfbhfbrtr28820222",
      orderItems: [
        {
          name: "IPhone 14 Pro Max",
        },
        {
          name: "IPhone 14 Pro Max",
        },
        {
          name: "IPhone 14 Pro Max",
        },
      ],
      totalPrice: 200,
      orderStatus: "Delivered",
    },
    {
      _id: "7463hvbfbhfbrtr28820223",
      orderItems: [
        {
          name: "IPhone 14 Pro Max",
        },
        {
          name: "IPhone 14 Pro Max",
        },
      ],
      totalPrice: 150,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered"
          ? "text-green-600"
          : "text-yellow-600";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="flex flex-col pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "IPhone 14 Pro Max",
        },
      ],
      totalPrice: 350,
      orderStatus: "Processing",
    },
    {
      _id: "7463hvbfbhfbrtr28820222",
      orderItems: [
        {
          name: "IPhone 14 Pro Max",
        },
        {
          name: "IPhone 14 Pro Max",
        },
        {
          name: "IPhone 14 Pro Max",
        },
      ],
      totalPrice: 200,
      orderStatus: "Delivered",
    },
    {
      _id: "7463hvbfbhfbrtr28820223",
      orderItems: [
        {
          name: "IPhone 14 Pro Max",
        },
        {
          name: "IPhone 14 Pro Max",
        },
      ],
      totalPrice: 150,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered"
          ? "text-green-600"
          : "text-yellow-600";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="flex flex-col pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </div>
  );
};

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/change-user-password`,
        { currentPassword, newPassword, confirmNewPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className="text-center text-[25px] font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={changePasswordHandler}
          className="flex flex-col items-center"
        >
          <div className="w-full 800px:w-[50%] pb-3 mt-5">
            <label htmlFor="currentPassword" className="block pb-2">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className={`${styles.input}`}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] pb-3">
            <label htmlFor="newPassword" className="block pb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className={`${styles.input}`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] pb-3">
            <label htmlFor="confirmNewPassword" className="block pb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className={`${styles.input}`}
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] pb-3">
            <input
              type="submit"
              className="w-full h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded mt-8 cursor-pointer"
              value={`Change Password`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      country === "" ||
      city === "" ||
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      addressType === ""
    ) {
      toast.error("All fields are required!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] flex items-center justify-center">
          <div className="w-[35%] h-[80vh] overflow-y-scroll bg-white rounded shadow">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit}>
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label htmlFor="country" className="block pb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      id="country"
                      value={country}
                      className={`${styles.input}`}
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="" className="block pb-2">
                        Select country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((i, index) => (
                          <option
                            key={index}
                            value={i.isoCode}
                            className="block pb-2"
                          >
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label htmlFor="city" className="block pb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      id="city"
                      value={city}
                      className={`${styles.input}`}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="" className="block pb-2">
                        Select city
                      </option>
                      {City &&
                        City.getCitiesOfCountry(country).map((i, index) => (
                          <option
                            key={index}
                            value={i.isoCode}
                            className="block pb-2"
                          >
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label htmlFor="address1" className="block pb-2">
                      Address 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address1"
                      id="address1"
                      value={address1}
                      className={`${styles.input}`}
                      required
                      placeholder="Enter your address 1"
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label htmlFor="address2" className="block pb-2">
                      Address 2 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address2"
                      id="address2"
                      value={address2}
                      className={`${styles.input}`}
                      required
                      placeholder="Enter your address 2"
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label htmlFor="zipCode" className="block pb-2">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="zipCode"
                      id="zipCode"
                      value={zipCode}
                      className={`${styles.input}`}
                      required
                      placeholder="Enter your zip code"
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label htmlFor="addressType" className="block pb-2">
                      Address Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="addressType"
                      id="addressType"
                      value={addressType}
                      className={`${styles.input}`}
                      required
                      onChange={(e) => setAddressType(e.target.value)}
                    >
                      <option value="" className="block pb-2">
                        Select address type
                      </option>
                      <option value="Default" className="block pb-2">
                        Default
                      </option>
                      <option value="Home" className="block pb-2">
                        Home
                      </option>
                      <option value="Office" className="block pb-2">
                        Office
                      </option>
                    </select>
                  </div>

                  <div className={`w-full pb-2`} onClick={handleSubmit}>
                    <input
                      type="submit"
                      className="w-[100%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded mt-8 cursor-pointer"
                      value={"Add Address"}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Shipping Address
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white h-[70px] rounded-[4px] px-3 mb-[20px] shadow flex items-center justify-between"
          >
            <div className="flex items-center">
              <h5 className="font[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6>
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6>{user && user.phoneNumber}</h6>
            </div>
            <div className="min-h-[10px] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                title="Delete Address"
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}
      {user && user.length < 1 && (
        <h1 className="text-center text-[16px] text-[#000000ba] pt-6">
          {`You don't have any saved addresses!`}
        </h1>
      )}
    </div>
  );
};

export default ProfileContent;
