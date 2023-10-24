import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { RiCustomerServiceFill } from "react-icons/ri";
// import SearchInput from "./Search";
import { BiLogOut } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
const Navbar = ({ onSearch, cartCount }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = () => {
    onSearch(searchTerm);
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
    <div className="w-full h-16 bg-white shadow-md flex justify-between items-center">
      <div className="flex items-center ml-14">
        <p className="font-bold text-green-600 mr-4 text-xl">
          <button onClick={() => navigate("/")}>GadgetStore</button>
        </p>
      </div>
      <div className="flex flex-row gap-x-5">
        <div className="relative">
          <input
            className="shadow-md rounded-md px-10 py-2 focus:outline-none w-60"
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
        <p className="font-semibold text-sm flex items-center">
          <button
            onClick={() => navigate("/chatbot")}
            className=" flex gap-x-2"
          >
            <RiCustomerServiceFill size={20} />
            Contact Us
          </button>
        </p>
        {isLoggedIn ? (
          <div className="flex items-center mr-10 gap-x-5">
            <a href="">
              <AiOutlineShoppingCart size={20} onClick={handleCart} />
              {cartCount?.length ? (
                <div className="absolute top-1 right-1 text-xs rounded-full bg-red-500 text-white px-1">
                  {cartCount.length}
                </div>
              ) : (
                <></>
              )}
            </a>
            <button
              onClick={toggleDropdown}
              className="font-semibold flex items-center gap-x-2"
            >
              <RxAvatar size={30} /> Hello, {user}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-4  mt-40 w-32 bg-white rounded-md shadow-md z-10">
                <ul className="py-2 text-base text-black gap-y-2 flex flex-col ">
                  <button
                    className="font-semibold flex ml-5 gap-x-2 items-center"
                    // onClick={handleSortAZ}
                  >
                    <RxAvatar size={20} /> Profil
                  </button>
                  <button
                    className="font-semibold flex ml-5 gap-x-2 items-center"
                    onClick={openLogoutModal}
                  >
                    <BiLogOut size={20} /> Logout
                  </button>
                  {isLogoutModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
                      <div className="bg-white w-96 rounded-lg p-4">
                        <p className="font-semibold">
                          Apakah Anda yakin ingin logout?
                        </p>
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
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="mr-10">
            <button
              className="font-semibold outline px-3 py-2 rounded-md mr-5"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
