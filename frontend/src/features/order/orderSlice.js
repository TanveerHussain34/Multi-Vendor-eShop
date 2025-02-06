import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // get all orders for a user
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

    // get all orders for a shop
    getAllOrdersShopRequest: (state) => {
      state.isLoading = true;
    },
    getAllOrdersShopSuccess: (state, action) => {
      state.isLoading = false;
      state.ordersShop = action.payload;
    },
    getAllOrdersShopFail: (state, action) => {
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
  getAllOrdersShopRequest,
  getAllOrdersShopSuccess,
  getAllOrdersShopFail,
  clearErrors,
} = orderSlice.actions;

export default orderSlice.reducer;
