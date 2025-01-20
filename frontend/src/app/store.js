import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import sellerReducer from "../features/seller/sellerSlice";
import productReducer from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
  },
});
