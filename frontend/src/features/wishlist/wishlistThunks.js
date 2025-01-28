import { addToWishlist, removeFromWishlist } from "./wishlistSlice";

// add to wishlist thunk
export const addToWishlistThunk = (data) => async (dispatch, getState) => {
  dispatch(addToWishlist(data));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

// remove from wishlist thunk
export const removeFromWishlistThunk = (data) => async (dispatch, getState) => {
  dispatch(removeFromWishlist(data._id));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};
