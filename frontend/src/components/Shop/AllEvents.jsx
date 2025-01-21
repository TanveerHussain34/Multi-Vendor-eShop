import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import {
  deleteEvent,
  getAllEventsShop,
} from "../../features/event/eventThunks";

function AllEvents() {
  const { events, isLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller?._id));
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold Out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const eventName = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${eventName}`}>
              <Button>
                <AiOutlineEye size={20} title="View" />
              </Button>
            </Link>
          </>
        );
      },
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

  events &&
    events.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        stock: item.stock,
        sold: 10,
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

export default AllEvents;
