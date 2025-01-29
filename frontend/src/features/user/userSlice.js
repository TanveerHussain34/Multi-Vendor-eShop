import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // update user profile
    updateUserProfileRequest: (state) => {
      state.loading = true;
    },
    updateUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updateUserProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // update user address
    updateUserAddressRequest: (state) => {
      state.addressLoading = true;
    },
    updateUserAddressSuccess: (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload;
    },
    updateUserAddressFail: (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    },

    // delete user address
    deleteUserAddressRequest: (state) => {
      state.addressLoading = true;
    },
    deleteUserAddressSuccess: (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload;
    },
    deleteUserAddressFail: (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions and reducer
export const {
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
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
