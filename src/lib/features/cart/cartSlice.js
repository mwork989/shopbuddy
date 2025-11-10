import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart(state, { payload }) {
      const found = state.items.find((i) => i.id === payload.id);
      if (found) found.qty += 1;
      else state.items.push({ ...payload, qty: 1 });
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart } = slice.actions;
export default slice.reducer;
