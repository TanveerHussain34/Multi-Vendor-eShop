import axios from "axios";
import { loadUserRequest, loadUserSuccess, loadUserFail } from "./userSlice";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data?.user));
  } catch (error) {
    dispatch(
      loadUserFail(error?.response?.data?.message || "Something went wrong!")
    );
  }
};
