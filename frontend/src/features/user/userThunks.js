import axios from "axios";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  clearErrors,
} from "./userSlice";
import { server } from "../../server";

// Thunk to load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${server}/get-user`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// Optionally clear errors
export const resetError = () => (dispatch) => {
  dispatch(clearErrors());
};
