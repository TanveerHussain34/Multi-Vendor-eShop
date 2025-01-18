import axios from "axios";
import {
  loadSellerRequest,
  loadSellerSuccess,
  loadSellerFail,
} from "./sellerSlice";
import { server } from "../../server";

// load seller/shop
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch(loadSellerRequest());
    const { data } = await axios.get(`${server}/shop/get-seller`, {
      withCredentials: true,
    }); // data coming back from the backend
    dispatch(loadSellerSuccess(data?.seller));
  } catch (error) {
    dispatch(loadSellerFail(error?.response?.data?.message));
  }
};
