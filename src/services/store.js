import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./product";
export default configureStore({
  reducer: {
    productCart: productsReducer,
  },
});
