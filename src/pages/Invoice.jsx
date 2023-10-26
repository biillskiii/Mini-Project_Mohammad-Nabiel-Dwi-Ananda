import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux"; // Import useSelector untuk mengakses data dari Redux store

const Invoice = () => {
  // Mengambil data keranjang belanja dari Redux store
  const cartItems = useSelector((state) => state.products.cart);

  // Menghitung subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const taxRate = 0.11; // 10%
  const tax = subtotal * taxRate;

  // Menghitung total
  const total = subtotal + tax;

  return (
    <>
      <Navbar />
      <div className="w-8/12 mx-auto mt-32 bg-white shadow-xl">
        <div className="p-10">
            <div className="text-slate-700">
              <p className="text-xl font-extrabold uppercase font-body text-center">
                Gadget Store
              </p>
              <p className="text-lg font-semibold font-body text-center">Invoice</p>
            </div>

          <div className="p-9">
            <div className="flex items-center flex-col mx-0">
              <table className="w-11/12 divide-y divide-slate-500">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-bold text-slate-700 sm:pl-6 md:pl-0"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b border-slate-200">
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div className="font-medium text-slate-700">
                          {item.title}
                        </div>
                        <div className="mt-0.5 text-slate-500 sm:hidden">
                          {item.qty} unit at ${item.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:pr-6 md:pr-0"
                    >
                      Subtotal
                    </th>
                    <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      ${subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:pr-6 md:pr-0"
                    >
                      Tax (10%)
                    </th>
                    <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      ${tax.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:pr-6 md:pr-0"
                    >
                      Total
                    </th>
                    <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
