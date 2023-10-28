import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("getProducts", async (arg) => {
  const result = await fetch(
    "https://6527d572931d71583df17723.mockapi.io/products"
  ).then((res) => res.json());
  return result;
});

export const createProduct = createAsyncThunk(
  "createProduct",
  async (productData) => {
    const result = await fetch(
      "https://6527d572931d71583df17723.mockapi.io/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    ).then((res) => res.json());
    return result;
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (productData) => {
    const result = await fetch(
      `https://6527d572931d71583df17723.mockapi.io/products/${productData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    ).then((res) => res.json());
    return result;
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (productId) => {
    const result = await fetch(
      `https://6527d572931d71583df17723.mockapi.io/products/${productId}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());
    return result;
  }
);

const products = createSlice({
  name: "productAdmin",
  initialState: {
    products: [],
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      let olditems = state.cart.filter(
        (products) => products.id !== action.payload.id
      );
      let newItems = state.cart.filter(
        (products) => products.id === action.payload.id
      );
      let newQty = newItems.length ? newItems[0]?.qty + 1 : 1;
      newItems.length
        ? (newItems[0] = { ...action.payload, qty: newQty })
        : (newItems = [{ ...action.payload, qty: newQty }]);
      olditems.push(newItems[0]);
      state.cart = olditems;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter(
        (products) => products.id != action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementItem: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload) {
          if (product.qty < 99) { 
            product.qty += 1;
          }
        }
        return product;
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    
    decrementItem: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload) {
          if (product.qty > 1) {
            product.qty -= 1;
          }
        }
        return product;
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    updateCart: (state) => {
      if (!state.cart.length && localStorage.getItem("cart")) {
        try {
          state.cart = JSON.parse(localStorage.getItem("cart"));
        } catch (error) {
          if (error) localStorage.removeItem("cart");
        }
      }
    },
    getTotals(state, action) {
      let { total, quantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, qty } = cartItem; 
          const itemTotal = price * qty;
          cartTotal.total += itemTotal;
          cartTotal.quantity += qty; 

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload];
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const updatedProducts = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        state.products = updatedProducts;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedProductId = action.payload;
        const updatedProducts = state.products.filter(
          (product) => product.id !== deletedProductId
        );
        state.products = updatedProducts;
    });
  },
});

export const {
  addToCart,
  deleteItem,
  incrementItem,
  decrementItem,
  getCart,
  updateCart,
  getTotals,
} = products.actions;

export default products.reducer;
