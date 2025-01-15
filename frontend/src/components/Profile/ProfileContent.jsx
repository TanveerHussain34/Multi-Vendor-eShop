import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { backendUrl } from "../../server";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineTrackChanges } from "react-icons/md";

/* eslint-disable react/prop-types */
function ProfileContent({ active }) {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState((user && user.name) || "");
  const [email, setEmail] = useState((user && user.email) || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full block 800px:flex justify-between">
                <div className="w-full 800px:w-[48%] pb-3">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input}`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-full 800px:w-[48%] pb-3">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input}`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full block 800px:flex justify-between">
                <div className="w-full 800px:w-[48%] pb-3">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="text"
                    className={`${styles.input}`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-full 800px:w-[48%] pb-3">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="text"
                    className={`${styles.input}`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full block 800px:flex justify-between">
                <div className="w-full 800px:w-[48%] pb-3">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="text"
                    className={`${styles.input}`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className="w-full 800px:w-[48%] pb-3">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="text"
                    className={`${styles.input}`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center">
                <input
                  className="w-full 800px:w-[48%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded mt-8 cursor-pointer"
                  required
                  value="Update"
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

      {/* Payment Methods */}
      {active == 6 && (
        <div>
          <PaymentMethods />
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

const PaymentMethods = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] px-3 shadow flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https:bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font[600]">Tanveer Hussain</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>4563 **** **** ****</h6>
          <h5 className="pl-6">07/28</h5>
        </div>
        <div className="min-h-[10px] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Shipping Address
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] px-3 shadow flex items-center justify-between">
        <div className="flex items-center">
          <h5 className="font[600]">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>Jamia Masjid, Main Bazar, Raiwind, Lahore.</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>+92 309 7053080</h6>
        </div>
        <div className="min-h-[10px] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
