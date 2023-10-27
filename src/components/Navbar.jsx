import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiCustomerServiceFill } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const username = localStorage.getItem("user");
  const parsedUser = JSON.parse(username);
  const user = parsedUser ? parsedUser.username : "";

  return (
    <div className="w-full bg-white shadow-md flex justify-between items-center p-4">
      <div>
        <p className="font-bold text-green-600 text-xl ml-10">
          <button onClick={() => navigate("/")}>GadgetStore</button>
        </p>
      </div>
      <div className="hidden lg:flex items-center">
        <p className="font-semibold text-sm flex items-center">
          <button onClick={() => navigate("/chatbot")} className="flex gap-x-2">
            <RiCustomerServiceFill size={20} />
            Contact Us
          </button>
        </p>
        {isLoggedIn && (
          <div className="flex items-center ml-10 gap-x-5 mr-14">
            <a href="">
              <AiOutlineShoppingCart size={20} onClick={handleCart} />
            </a>
            <button
              onClick={toggleDropdown}
              className="font-semibold flex items-center gap-x-2"
            >
              <RxAvatar size={30} /> Hello, {user}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-4 mt-10 w-32 bg-white rounded-md shadow-md z-10">
                <ul className="py-2 text-base text-black gap-y-2 flex flex-col">
                  <li
                    className="font-semibold flex ml-5 gap-x-2 items-center"
                    onClick={() => navigate("/profile")}
                  >
                    <RxAvatar size={20} /> Profile
                  </li>
                  <li
                    className="font-semibold flex ml-5 gap-x-2 items-center"
                    onClick={openLogoutModal}
                  >
                    <BiLogOut size={20} /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="lg:hidden flex items-center">
        <button
          onClick={toggleDropdown}
          className="text-2xl text-gray-600 focus:outline-none"
        >
          {isDropdownOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {isDropdownOpen && (
        <div className="lg:hidden absolute w-full bg-white top-16 right-0 shadow-md z-10">
          <ul className="py-2 text-base text-black">
            <li
              className="px-4 py-2 flex items-center cursor-pointer"
              onClick={() => navigate("/chatbot")}
            >
              <RiCustomerServiceFill size={20} className="mr-2" />
              Contact Us
            </li>
            {isLoggedIn && (
              <>
                <li
                  className="px-4 py-2 flex items-center cursor-pointer"
                  onClick={handleCart}
                >
                  <AiOutlineShoppingCart size={20} className="mr-2" />
                  Cart
                </li>
                <li
                  onClick={toggleDropdown}
                  className="px-4 py-2 font-semibold flex items-center gap-x-2 cursor-pointer"
                >
                  <RxAvatar size={20} /> Hello, {user}
                </li>
                <li
                  className="px-4 py-2 flex items-center cursor-pointer"
                  onClick={handleLogout}
                >
                  <BiLogOut size={20} className="mr-2" />
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
