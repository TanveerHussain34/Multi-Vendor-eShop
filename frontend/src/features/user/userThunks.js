import axios from "axios";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFail,
  updateUserAddressRequest,
  updateUserAddressSuccess,
  updateUserAddressFail,
  deleteUserAddressRequest,
  deleteUserAddressSuccess,
  deleteUserAddressFail,
} from "./userSlice";
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

// update user profile
export const updateUserProfile =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch(updateUserProfileRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-profile`,
        { name, email, phoneNumber, password },
        {
          withCredentials: true,
        }
      );
      dispatch(updateUserProfileSuccess(data?.user));
    } catch (error) {
      dispatch(
        updateUserProfileFail(
          error?.response?.data?.message || "Something went wrong!"
        )
      );
    }
  };

// update user address
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch(updateUserAddressRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-address`,
        { country, city, address1, address2, zipCode, addressType },
        {
          withCredentials: true,
        }
      );
      dispatch(
        updateUserAddressSuccess({
          successMessage: "User address added succesfully!",
          user: data.user,
        })
      );
    } catch (error) {
      dispatch(
        updateUserAddressFail(
          error?.response?.data?.message || "Something went wrong!"
        )
      );
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserAddressRequest());
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );
    dispatch(
      deleteUserAddressSuccess({
        successMessage: "User address deleted succesfully!",
        user: data.user,
      })
    );
  } catch (error) {
    dispatch(
      deleteUserAddressFail(
        error?.response?.data?.message || "Something went wrong!"
      )
    );
  }
};
