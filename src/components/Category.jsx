import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
const Category = ({ onSelectCategory, onSort, onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownCategoryRef = useRef(null);
  const dropdownFilterRef = useRef(null);

  useEffect(() => {
    // Event listener untuk menutup dropdown kategori saat mengklik di luar dropdown
    function handleClickOutsideCategory(event) {
      if (
        dropdownCategoryRef.current &&
        !dropdownCategoryRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    }

    // Event listener untuk menutup dropdown filter saat mengklik di luar dropdown
    function handleClickOutsideFilter(event) {
      if (
        dropdownFilterRef.current &&
        !dropdownFilterRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideCategory);
    document.addEventListener("mousedown", handleClickOutsideFilter);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCategory);
      document.removeEventListener("mousedown", handleClickOutsideFilter);
    };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const handleSelectAll = () => {
    setSelectedCategory("All");
    onSelectCategory("All");
  };

  const dropdownCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortAZ = () => {
    onSort("AZ");
  };

  const handleSortZA = () => {
    onSort("ZA");
  };

  const handleSortPriceAsc = () => {
    onSort("priceAsc");
  };

  const handleSortPriceDesc = () => {
    onSort("priceDesc");
  };

  const handleSortRatingAsc = () => {
    onSort("ratingAsc");
  };

  const handleSortRatingDesc = () => {
    onSort("ratingDesc");
  };
  const handleSearch = () => {
    onSearch(searchTerm);
  };
  return (
    <div className="w-11/12 h-14 bg-white flex flex-row justify-start items-center ml-16 rounded-md shadow-md">
      <div className="flex flex-row gap-x-5">
        <div className="relative">
          <input
            className="border-2 rounded-md ml-5 px-3 py-2 focus:outline-none w-60"
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
      <div className="flex ms-auto mr-5">
        <div
          className="ml-8 flex items-center gap-x-2 ms-auto mr-16 cursor-pointer"
          onClick={dropdownCategory}
        >
          <BiSolidCategory /> Category
        </div>
        {isCategoryOpen && (
          <div
            ref={dropdownCategoryRef}
            className="absolute right-52 mt-14 w-32 flex flex-col bg-white rounded-md shadow-md"
          >
            <button
              className={`px-2 py-1 rounded-md text-sm font-semibold flex text-center  ${
                selectedCategory === "All" ? "bg-green-600 text-white" : ""
              }`}
              onClick={handleSelectAll}
            >
              All
            </button>
            <button
              className={`px-2 py-1 rounded-md text-sm font-semibold flex text-center ${
                selectedCategory === "smartphones"
                  ? " bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => handleCategorySelect("smartphones")}
            >
              Smartphone
            </button>
            <button
              className={`px-2 py-1 rounded-md text-sm font-semibold flex text-center ${
                selectedCategory === "laptops" ? " bg-green-600 text-white" : ""
              }`}
              onClick={() => handleCategorySelect("laptops")}
            >
              Laptop
            </button>
            <button
              className={`px-2 py-1 rounded-md text-sm font-semibold flex  text-center ${
                selectedCategory === "Aksesoris"
                  ? " bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => handleCategorySelect("Aksesoris")}
            >
              Aksesoris
            </button>
          </div>
        )}
        <div
          className="mr-5 flex flex-row gap-x-2 items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <LuFilter size={20} /> Filter
        </div>
        {isDropdownOpen && (
          <div
            ref={dropdownFilterRef}
            className="absolute right-8 mt-14 w-52 text-center bg-white rounded-md shadow-md"
          >
            <ul className="py-2 text-sm text-gray-700 flex flex-col justify-center">
              <button
                className="font-semibold flex items-center gap-x-2 ml-3"
                onClick={handleSortAZ}
              >
                <AiOutlineSortAscending size={20} /> A-Z
              </button>
              <button
                className="font-semibold flex items-center gap-x-2 ml-3"
                onClick={handleSortZA}
              >
                <AiOutlineSortDescending size={20} /> Z-A
              </button>
              <button
                className="font-semibold flex items-center gap-x-2 ml-3"
                onClick={handleSortPriceAsc}
              >
                <BsSortNumericDown size={20} /> Harga Termahal
              </button>
              <button
                className="font-semibold flex items-center gap-x-2 ml-3"
                onClick={handleSortPriceDesc}
              >
                <BsSortNumericUp size={20} /> Harga Termurah
              </button>
              <button
                className="font-semibold flex items-center gap-x-2 ml-3"
                onClick={handleSortRatingAsc}
              >
                <BsSortNumericDown size={20} /> Rating Terbesar
              </button>
              <button
                className="font-semibold flex items-center gap-x-2 ml-3"
                onClick={handleSortRatingDesc}
              >
                <BsSortNumericUp size={20} /> Rating Terkecil
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
