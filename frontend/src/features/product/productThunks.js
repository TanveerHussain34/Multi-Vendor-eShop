import axios from "axios";
import {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  getAllProductsShopFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
} from "./productSlice";
import { server } from "../../server";

// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch(productCreateRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    ); // data sending to the backend
    dispatch(productCreateSuccess(data?.product));
  } catch (error) {
    dispatch(productCreateFail(error?.response?.data?.message));
  }
};

// get all products for a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllProductsShopRequest());
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    ); // getting data back from backend
    dispatch(getAllProductsShopSuccess(data?.products));
  } catch (error) {
    dispatch(getAllProductsShopFail(error?.response?.data?.message));
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteProductSuccess(data?.message));
  } catch (error) {
    dispatch(deleteProductFail(error?.response?.data?.message));
  }
};
