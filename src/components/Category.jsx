import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const Category = ({ onSelectCategory, onSort }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const handleSelectAll = () => {
    setSelectedCategory("All");
    onSelectCategory("All");
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

  return (
    <div className="w-11/12 h-14 bg-white flex flex-row justify-start items-center ml-16 rounded-md shadow-md">
      <button
        className={`ml-5 px-2 py-1 rounded-md text-sm font-semibold flex items-center ${
          selectedCategory === "All" ? "bg-green-600 text-white" : ""
        }`}
        onClick={handleSelectAll}
      >
        All
      </button>
      <button
        className={`px-2 py-1 rounded-md text-sm font-semibold flex items-center${
          selectedCategory === "smartphones" ? " bg-green-600 text-white" : ""
        }`}
        onClick={() => handleCategorySelect("smartphones")}
      >
        Smartphone
      </button>
      <button
        className={`px-2 py-1 rounded-md text-sm font-semibold flex items-center${
          selectedCategory === "laptops" ? " bg-green-600 text-white" : ""
        }`}
        onClick={() => handleCategorySelect("laptops")}
      >
        Laptop
      </button>
      <button
        className={`px-2 py-1 rounded-md text-sm font-semibold flex items-center${
          selectedCategory === "Aksesoris" ? " bg-green-600 text-white" : ""
        }`}
        onClick={() => handleCategorySelect("Aksesoris")}
      >
        Aksesoris
      </button>
      <div className="ms-auto mr-5">
        <button
          className="mr-5 flex flex-row gap-x-2 items-center"
          onClick={toggleDropdown}
        >
          <LuFilter size={20} /> Filter
        </button>
        {isDropdownOpen && (
          <div className="absolute right-8 mt-8 w-52 text-center bg-white rounded-md shadow-md ">
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
