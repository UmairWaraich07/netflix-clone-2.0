import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscription: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});
export default subscriptionSlice.reducer;
export const { setSubscription } = subscriptionSlice.actions;
