import axios from "axios";
import {
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
  getAllOrdersUserFail,
} from "./orderSlice";
import { server } from "../../server";

// get all products for a shop
export const getAllOrdersUser = (userId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersUserRequest());
    const { data } = await axios.get(
      `${server}/order/get-all-orders-user/${userId}`
    );
    dispatch(getAllOrdersUserSuccess(data?.orders));
  } catch (error) {
    dispatch(getAllOrdersUserFail(error?.response?.data?.message));
  }
};
