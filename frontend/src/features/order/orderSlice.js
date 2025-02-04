import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // get all products for a shop
    getAllOrdersUserRequest: (state) => {
      state.isLoading = true;
    },
    getAllOrdersUserSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    getAllOrdersUserFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
  getAllOrdersUserFail,
  clearErrors,
} = orderSlice.actions;

export default orderSlice.reducer;
