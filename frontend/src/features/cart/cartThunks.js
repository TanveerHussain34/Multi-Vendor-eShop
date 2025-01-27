import { addToCart, removeFromCart } from "./cartSlice";

// add to cart thunk
export const addToCartThunk = (data) => async (dispatch, getState) => {
  dispatch(addToCart(data));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart thunk
export const removeFromCartThunk = (data) => async (dispatch, getState) => {
  dispatch(removeFromCart(data._id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
