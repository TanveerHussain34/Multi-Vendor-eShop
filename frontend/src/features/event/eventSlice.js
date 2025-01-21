import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    eventCreateRequest: (state) => {
      state.isLoading = true;
    },
    eventCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    },
    eventCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    // get all evens for a shop
    getAllEventsShopRequest: (state) => {
      state.isLoading = true;
    },
    getAllEventsShopSuccess: (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    },
    getAllEventsShopFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // delete even of a shop
    deleteEventRequest: (state) => {
      state.isLoading = true;
    },
    deleteEventSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteEventFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions and reducer
export const {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
  getAllEventsShopFail,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFail,
  clearErrors,
} = eventSlice.actions;

export default eventSlice.reducer;
