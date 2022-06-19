import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQty: 0,
  totalAmount: 0,
  tax: 0,
};

const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {
    getTotalQtyAndTax(state, action) {
      const amountAndQtyList = action.payload.cartItems.map((item) => {
        const quantity = item.quantity;
        return {
          amount: item.product.prices.filter(
            (price) => price.currency.symbol === action.payload.currency
          ),
          qty: quantity,
        };
      });

      const reducedTotal = amountAndQtyList.reduce(
        (total, item) => {
          total.totalAmount += item.amount[0].amount * item.qty;
          return total;
        },
        {
          totalAmount: 0,
        }
      );

      const result = action.payload.cartItems.reduce(
        (total, product) => {
          total.totalQty += product.quantity;
          total.totalAmount = reducedTotal.totalAmount;
          total.tax = total.totalAmount * 0.21;

          return total;
        },
        {
          totalQty: 0,
          totalAmount: 0,
          tax: 0,
        }
      );

      state.tax = result.tax;
      state.totalAmount = result.totalAmount;
      state.totalQty = result.totalQty;
    },
  },
});

export const totalSliceActions = totalSlice.actions;

export default totalSlice.reducer;


