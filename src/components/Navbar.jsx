import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiCustomerServiceFill } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import { BiSearchAlt2 } from "react-icons/bi";
const Navbar = ({onSearch}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "user";
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", !"user");
    setIsLoggedIn(false);
    navigate("/login");
  };
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const username = localStorage.getItem("userCredentials");
  const parsedUser = JSON.parse(username);
  const user = parsedUser ? parsedUser.username : "";

  return (
    <div className="w-full bg-white shadow-md flex justify-between items-center p-4">
      <div>
        <p className="font-bold text-green-600 text-xl lg:ml-5">
          <button onClick={() => navigate("/")}>GadgetStore</button>
        </p>
      </div>
      <div className="hidden lg:flex items-center gap-x-4">
        <div className="flex flex-row gap-x-5 lg:gap-x-5">
          <div className="relative">
            <input
              className="border-2 border-slate-50 rounded-md px-3 py-2 focus:outline-none lg:w-60 ml-5 w-40"
              type="text"
              placeholder="Cari barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BiSearchAlt2
              size={30}
              className="absolute top-2 right-2 text-gray-400 cursor-pointer"
              onClick={() => onSearch(searchTerm)}
            />
          </div>
        </div>
        <p className="font-semibold text-sm flex items-center">
          <button onClick={() => navigate("/chatbot")} className="flex gap-x-2">
            <RiCustomerServiceFill size={20} />
            Contact Us
          </button>
        </p>
        {isLoggedIn && (
          <div className="flex items-center gap-x-5 mr-14">
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
              <div className="absolute right-16 mt-32 w-32 bg-white rounded-md shadow-md z-10">
                <ul className="py-2 text-base text-black gap-y-2 flex flex-col">
                  <li
                    className="font-semibold flex ml-5 gap-x-2 items-center cursor-pointer"
                    onClick={openLogoutModal}
                  >
                    <BiLogOut size={20} /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="flex gap-x-2 border-2 px-3 py-2 border-black rounded-md ml-5 mr-12 font-semibold"
          >
            Login
          </button>
        )}
      </div>
      <div className="lg:hidden flex items-center">
        <button
          onClick={toggleDropdown}
          className="text-2xl text-gray-600 focus:outline-none"
        >
          {isDropdownOpen ? (
            <GrClose size={25} />
          ) : (
            <RxHamburgerMenu size={25} />
          )}
        </button>
      </div>
      {isDropdownOpen && (
        <div className="lg:hidden absolute w-full bg-white top-16 right-0 shadow-md z-20">
          <ul className="py-2 text-base text-black">
            <li
              className="px-4 py-2 flex items-center cursor-pointer"
              onClick={() => navigate("/chatbot")}
            >
              <RiCustomerServiceFill size={20} className="mr-2" />
              Contact Us
            </li>
            <div className=" flex flex-row gap-x-5 lg:gap-x-5">
              <div className="relative w-11/12">
                <input
                  className="w-11/12 mx-10 border-2 border-slate-50 rounded-md px-3 py-2 focus:outline-none lg:w-60"
                  type="text"
                  placeholder="Cari barang..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BiSearchAlt2
                  size={30}
                  className="absolute top-2 right-2 text-gray-400 cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </div>
            {isLoggedIn ? (
              <>
                <li
                  className="px-4 py-2 flex items-center cursor-pointer"
                  onClick={handleCart}
                >
                  <AiOutlineShoppingCart size={20} className="mr-2" />
                  Cart
                </li>
                <li className="px-4 py-2 font-semibold flex items-center gap-x-2 cursor-pointer">
                  <RxAvatar size={20} /> Hello, {user}
                </li>
                <li
                  className="px-4 py-2 flex items-center cursor-pointer"
                  onClick={openLogoutModal}
                >
                  <BiLogOut size={20} className="mr-2" />
                  Logout
                </li>
              </>
            ) : (
              <li
                onClick={() => navigate("/login")}
                className="w-full flex items-center justify-center bg-green-600 gap-x-2 px-2 py-1 rounded-md text-white font-semibold text-center"
              >
                Login
              </li>
            )}
          </ul>
        </div>
      )}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg p-4">
            <p className="font-semibold">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 text-gray-600 mr-4 outline-black"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-500 rounded-md font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
