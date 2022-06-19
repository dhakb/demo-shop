import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      let cartItems = current(state).cartItems;

      const isEqual = (a, b) => {
        for (let el of a) {
          const aLength = a.filter((e) => e === el).length;
          const bLength = b.filter((e) => e === el).length;
          if (aLength !== bLength) return false;
        }
        return true;
      };

      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].product.id === action.payload.product.id) {
          const existingProdAttrValues = Object.values(
            cartItems[i].selectedAttributes
          );
          const nextProdAttrValues = Object.values(
            action.payload.selectedAttributes
          );
          if (isEqual(existingProdAttrValues, nextProdAttrValues)) {
            state.cartItems[i].quantity++;
            return;
          }
        }
      }

      state.cartItems.push(action.payload);
    },

    removeProductFromCart(state, action) {
      let cartItems = current(state).cartItems;

      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].quantity > 1 && cartItems[i].id === action.payload) {
          state.cartItems[i].quantity--;
        } else if (
          cartItems[i].quantity === 1 &&
          cartItems[i].id === action.payload
        ) {
          state.cartItems = cartItems.filter(
            (product) => product.id !== action.payload
          );
        }
      }
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice.reducer;
