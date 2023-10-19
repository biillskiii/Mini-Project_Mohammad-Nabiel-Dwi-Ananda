import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { BiSearchAlt2 } from "react-icons/bi";
import SearchInput from "@/components/Search"; // Perubahan disini: Gunakan nama komponen yang benar

const Navbar = ({ isLoggedIn, onSearch }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 bg-white shadow-md flex justify-between items-center">
      <div className="flex items-center ml-14">
        <p className="font-bold text-green-600 mr-4 text-xl">
          <a href="/">GadgetStore</a>
        </p>
      </div>
      <div className="flex flex-row gap-x-5">
        <SearchInput // Gunakan komponen SearchInput dengan benar
          className="shadow-md rounded-md px-10 py-2 focus:outline-none w-60"
          type="text"
          placeholder="Cari barang..."
        />
        {isLoggedIn ? (
          <div className="flex items-center mr-10 gap-x-5">
            <a href="">
              <AiOutlineShoppingCart size={20} />
            </a>
            <a href="">
              <RxAvatar size={30} />
            </a>
          </div>
        ) : (
          <div className="mr-10">
            <button
              className="font-semibold outline px-3 py-2 rounded-md mr-5"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="font-semibold text-white bg-green-600 rounded-md px-3 py-2"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
