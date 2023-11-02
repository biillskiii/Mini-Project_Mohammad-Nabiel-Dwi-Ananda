import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";


const Category = ({ onSelectCategory, onSort, onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const dropdownCategoryRef = useRef(null);
  const dropdownFilterRef = useRef(null);

  useEffect(() => {
    function handleClickOutsideCategory(event) {
      if (
        dropdownCategoryRef.current &&
        !dropdownCategoryRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    }

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


  return (
    <div className="w-7/12 lg:w-56  bg-white flex flex-row justify-start ms-auto mr-4 lg:mr-20 rounded-md">

      <div className="flex ms-auto">
        <div
          className="ml-8 flex items-center gap-x-2 ms-auto mr-5 cursor-pointer "
          onClick={dropdownCategory}
        >
          <BiSolidCategory /> Category
        </div>
        {isCategoryOpen && (
          <div
            ref={dropdownCategoryRef}
            className="absolute right-24 lg:right-32 lg:mt-14 lg:mr-20 mt- w-32 flex flex-col bg-white rounded-md shadow-md"
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
          className=" flex flex-row gap-x-2 items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <LuFilter size={20} /> Filter
        </div>
        {isDropdownOpen && (
          <div
            ref={dropdownFilterRef}
            className="absolute right-8 lg:right-16 mt-14 w-52 text-center bg-white rounded-md shadow-md"
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
                onClick={handleSortPriceDesc}
              >
                <BsSortNumericDown size={20} /> Harga Termahal
              </button>
              <button
                className="font-semibold flex items-center gap-x-2 ml-3"
                onClick={handleSortPriceAsc}
              >
                <BsSortNumericUp size={20} /> Harga Termurah
              </button>
              <button
                className="font-semibold flex items-center gap-x-2 ml-3"
                onClick={handleSortRatingDesc}
              >
                <BsSortNumericDown size={20} /> Rating Terbesar
              </button>
              <button
                className="font-semibold flex items-center gap-x-2 ml-3"
                onClick={handleSortRatingAsc}
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
