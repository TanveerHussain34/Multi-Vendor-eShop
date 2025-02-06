import axios from "axios";
import {
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
  getAllOrdersUserFail,
  getAllOrdersShopRequest,
  getAllOrdersShopSuccess,
  getAllOrdersShopFail,
} from "./orderSlice";
import { server } from "../../server";

// get all orders for a user
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

// get all orders for a shop
export const getAllOrdersShop = (shopId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersShopRequest());
    const { data } = await axios.get(
      `${server}/order/get-all-orders-shop/${shopId}`
    );
    dispatch(getAllOrdersShopSuccess(data?.orders));
  } catch (error) {
    dispatch(getAllOrdersShopFail(error?.response?.data?.message));
  }
};
