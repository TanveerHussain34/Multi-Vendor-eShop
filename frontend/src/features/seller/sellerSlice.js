import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    loadSellerRequest: (state) => {
      state.isLoading = true;
    },
    loadSellerSuccess: (state, action) => {
      state.isSellerAuthenticated = true;
      state.isLoading = false;
      state.seller = action.payload;
    },
    loadSellerFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSellerAuthenticated = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions and reducer
export const {
  loadSellerRequest,
  loadSellerSuccess,
  loadSellerFail,
  clearErrors,
} = sellerSlice.actions;

export default sellerSlice.reducer;
