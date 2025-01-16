import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import sellerReducer from "../features/seller/sellerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
  },
});
