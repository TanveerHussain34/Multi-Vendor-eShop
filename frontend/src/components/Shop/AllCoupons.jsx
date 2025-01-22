import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

function AllCoupons() {
  const { products } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/couponCode/get-all-coupons-shop/${seller?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.coupons);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.response?.data?.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/couponCode/create-coupon-code`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectProduct,
          shopId: seller?._id,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${server}/couponCode/delete-coupon-code/${id}`, {
      withCredentials: true,
    });
    toast.success("Coupon code deleted successfully!");
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Coupon ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "value",
      headerName: "Discount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} title="Delete" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  coupons &&
    coupons.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        value: item.value + "%",
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 my-10">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] !rounded-[5px] px-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="w-[90%] 800px:w-[40%] h-[85vh] bg-white rounded-md shadow p-4 overflow-y-scroll">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div>
                  <h5 className="text-[30px] font-Poppins text-center">
                    Create Coupon Code
                  </h5>
                  {/* create coupon form */}
                  <form onSubmit={handleSubmit}>
                    <br />
                    <div>
                      <label htmlFor="name" className="pb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="true"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter coupon code name"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <br />
                    <div>
                      <label htmlFor="value" className="pb-2">
                        Discount Percentage{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="value"
                        autoComplete="true"
                        required
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter coupon code discount percentage"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <br />
                    <div>
                      <label htmlFor="minAmount" className="pb-2">
                        Min Amount
                      </label>
                      <input
                        type="number"
                        id="minAmount"
                        autoComplete="true"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        placeholder="Enter coupon code min amount"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <br />
                    <div>
                      <label htmlFor="maxAmount" className="pb-2">
                        Max Amount
                      </label>
                      <input
                        type="number"
                        id="name"
                        autoComplete="true"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        placeholder="Enter coupon code max amount"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <br />
                    <div>
                      <label htmlFor="selectProduct" className="pb-2">
                        Product
                      </label>
                      <select
                        id="selectProduct"
                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                        value={selectProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                      >
                        <option value="Select a Products">
                          Select a Product
                        </option>
                        {products &&
                          products.map((i, index) => (
                            <option key={index} value={i.name}>
                              {i.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <br />
                    <div>
                      <input
                        type="submit"
                        value="Create"
                        className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]  hover:bg-blue-500 hover:text-white sm:text-sm transition duration-200 cursor-pointer"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AllCoupons;
