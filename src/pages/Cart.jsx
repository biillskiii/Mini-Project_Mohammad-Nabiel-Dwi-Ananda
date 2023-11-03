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
import Button from "../components/ButtonBack";
function Cart() {
  const cartItems = useSelector((state) => state.productCart.cart);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [selectAllClicked, setSelectAllClicked] = useState(false);

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
    return cartItems
      .filter((product) => selectedProducts[product.id])
      .reduce((total, product) => total + product.qty * product.price, 0);
  };
  const handleSelectAll = () => {
    if (selectAllClicked) {
      setSelectedProducts({});
    } else {
      const allProducts = {};
      cartItems.forEach((product) => {
        allProducts[product.id] = true;
      });
      setSelectedProducts(allProducts);
    }
    setSelectAllClicked(!selectAllClicked);
  };

  const total = calculateTotal();

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter(
      (product) => selectedProducts[product.id]
    );

    setSelectedProducts({});
    dispatch(updateCart(itemsToCheckout));
    dispatch(getTotals());

    localStorage.setItem("cart", JSON.stringify(itemsToCheckout));

    Swal.fire("Checkout Berhasil!");

    navigate("/invoice", { state: { itemsToCheckout } });
  };

  const isAnyProductSelected = Object.values(selectedProducts).some(
    (isSelected) => isSelected
  );

  return (
    <>
      <Navbar />
      <Button />
      <div className="h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  {cartItems.length === 0 ? (
                    <p className="mt-5 font-bold opacity-50 flex justify-center text-center">
                      Tidak ada produk di keranjang
                    </p>
                  ) : (
                    <tbody>
                      {cartItems.map((product) => (
                        <tr key={product.id} className="text-center">
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-4"
                                src={product.images}
                                alt={product.title}
                              />
                              <div className="flex flex-col justify-start items-start">
                                <span className="font-semibold">
                                  {product.title}
                                </span>
                                <span className="py-1 font-semibold text-start text-green-600">
                                  ${product.price}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className=" py-1 ">
                            <div className="flex items-center">
                              <button
                                className="border rounded-md py-2 px-2 mr-2"
                                onClick={() => handleDecrement(product.id)}
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {product.qty}
                              </span>
                              <button
                                className="border rounded-md py-2 px-2 ml-2"
                                onClick={() => handleIncrement(product.id)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            <button
                              className="text-red-500"
                              onClick={() => handleDelete(product.id)}
                            >
                              <BsFillTrash3Fill />
                            </button>
                          </td>
                          <td className="py-4">
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange(product.id)}
                              checked={selectedProducts[product.id] || false}
                            />
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
                  <div className="flex justify-between mb-2 gap-x-20">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-x-3 mb-3 items-center ms-auto">
                    <input
                      type="checkbox"
                      className="bg-green-500 text-white py-2 px-4 rounded-lg "
                      onClick={handleSelectAll}
                    />
                    <p>Select all</p>
                  </div>
                <button
                  className={`bg-green-500 text-white py-2 px-4 rounded-lg w-full ${
                    !isAnyProductSelected
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onClick={handleCheckout}
                  disabled={!isAnyProductSelected}
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
