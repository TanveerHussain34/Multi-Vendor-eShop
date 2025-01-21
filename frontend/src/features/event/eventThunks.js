import axios from "axios";
import {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
  getAllEventsShopFail,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFail,
} from "./eventSlice";
import { server } from "../../server";

// create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch(eventCreateRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    ); // data sending to the backend
    dispatch(eventCreateSuccess(data?.event));
  } catch (error) {
    dispatch(eventCreateFail(error?.response?.data?.message));
  }
};

// get all events for a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllEventsShopRequest());
    const { data } = await axios.get(
      `${server}/event/get-all-events-shop/${id}`
    ); // getting data back from backend
    dispatch(getAllEventsShopSuccess(data?.events));
  } catch (error) {
    dispatch(getAllEventsShopFail(error?.response?.data?.message));
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch(deleteEventRequest());
    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteEventSuccess(data?.message));
  } catch (error) {
    dispatch(deleteEventFail(error?.response?.data?.message));
  }
};
