import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../services/product";
import productAdmin from "./productAdmin";
export default configureStore({
  reducer: {
    products: productsReducer,
    productAdmin: productAdmin,
  },
});
