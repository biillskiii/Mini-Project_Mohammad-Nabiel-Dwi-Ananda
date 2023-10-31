import React from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import ButtonBack from "../components/ButtonBack"
const Invoice = () => {
  const location = useLocation();
  const itemsToCheckout = location.state.itemsToCheckout;
  const username = localStorage.getItem("userCredentials");
  const parsedUser = JSON.parse(username);
  const user = parsedUser ? parsedUser.username : "";
  const subtotal = itemsToCheckout.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const taxRate = 0.11;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <>
      <Navbar />
      <ButtonBack/> 
      <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
        <h1 className="font-bold text-2xl my-4 text-center text-green-600">
          GadgetStore
        </h1>
        <hr className="mb-2" />
        <div className="flex flex-col justify-between mb-6">
          <h1 className="text-2xl text-center font-extrabold">Invoice</h1>
          <h1 className="text-sm font-bold">Dear : {user}</h1>
          <div className="text-gray-700"></div>
        </div>
        <hr className="mb-2" />
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Product</th>
              <th className="text-right font-bold text-gray-700">Harga</th>
            </tr>
          </thead>
          <tbody>
            {itemsToCheckout.map((item) => (
              <tr key={item.id}>
                <td className="text-left text-gray-700">{item.title}</td>
                <td className="text-right text-gray-700">
                  ${(item.qty * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">Pajak 11%</td>
              <td className="text-right font-bold text-gray-700">
                ${tax.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td class="text-left font-bold text-gray-700">Total</td>
              <td class="text-right font-bold text-gray-700">
                ${total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
        <hr className="mb-5" />
        <div className="text-gray-700 mb-2">Terimakasih sudah berbelanja!</div>
        <div className="text-gray-700 text-sm">
          ditunggu kembali kedatangannya kak {user}!
        </div>
      </div>
    </>
  );
};

export default Invoice;
