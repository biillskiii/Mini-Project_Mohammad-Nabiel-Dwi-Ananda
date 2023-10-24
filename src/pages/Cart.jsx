import React, { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementItem,
  incrementItem,
  deleteItem,
  updateCart,
  getTotals,
} from "../services/product";
import Swal from "sweetalert2";
function Cart() {
  const cartItems = useSelector((state) => state.products.cart);
  const [selectedProducts, setSelectedProducts] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      dispatch(updateCart(savedCart));
      dispatch(getTotals());
    }
  }, [dispatch]);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => ({
      ...prevSelected,
      [productId]: !prevSelected[productId],
    }));
  };

  const handleIncrement = (productId) => {
    dispatch(incrementItem(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementItem(productId));
  };

  const handleDelete = (productId) => {
    dispatch(deleteItem(productId));
    dispatch(getTotals());
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, product) => total + product.qty * product.price,
      0
    );
  };

  const total = calculateTotal();

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter(
      (product) => !selectedProducts[product.id]
    );
    dispatch(updateCart(itemsToCheckout));
    dispatch(getTotals());
    localStorage.setItem("cart", JSON.stringify(itemsToCheckout));
    Swal.fire("Checkout Berhasil!");
    navigate("/invoice");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead className="text-center">
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                      <th className="text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  {cartItems.length === 0 ? (
                    <p className="mt-5 font-bold opacity-50 flex justify-center text-center">Tidak ada produk di keranjang</p>
                  ) : (
                    <tbody>
                      {cartItems.map((product) => (
                        <tr key={product.id}>
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-4"
                                src={product.images}
                                alt={product.title}
                              />
                              <span className="font-semibold">
                                {product.title}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">${product.price}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                className="border rounded-md py-2 px-4 mr-2"
                                onClick={() => handleDecrement(product.id)}
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {product.qty}
                              </span>
                              <button
                                className="border rounded-md py-2 px-4 ml-2"
                                onClick={() => handleIncrement(product.id)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            ${product.qty * product.price}
                          </td>
                          <td className="py-4">
                            <button
                              className="text-red-500"
                              onClick={() => handleDelete(product.id)}
                            >
                              <BsFillTrash3Fill />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
