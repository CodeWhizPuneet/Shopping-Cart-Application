import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { loadCartState, saveCartState } from "./storage";

const preloadedCartState = loadCartState();

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState: {
    cart: preloadedCartState
  }
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});
