import { createSlice } from "@reduxjs/toolkit";
import { getPayment, getledger } from "./payment.actions";
const INITIAL_STATE = {
paymentRes:{},
ledgerRes:{}
};
const paymentSlice = createSlice({
  name: "payment",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(getPayment.fulfilled, (state, action) => {
      state.paymentRes = action.payload;
    });
    builder.addCase(getledger.fulfilled, (state, action) => {
      state.ledgerRes = action.payload;
    });
  },
});
const { reducer } = paymentSlice;
export default reducer;
