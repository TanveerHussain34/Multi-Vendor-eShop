import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import { getAllOrdersShop } from "../../features/order/orderThunks";

function AllRefunds() {
  const { ordersShop, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller?._id));
  }, [dispatch, seller]);

  const eligibleOrders =
    ordersShop &&
    ordersShop.filter(
      (item) =>
        item.status === "Refund Processing" ||
        item.status === "Refund Successful"
    );

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ||
          params.value === "Refund Successful"
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

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 my-10">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
          />
        </div>
      )}
    </>
  );
}

export default AllRefunds;
