import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import sellerReducer from "../features/seller/sellerSlice";
import productReducer from "../features/product/productSlice";
import eventReducer from "../features/event/eventSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
  },
});
