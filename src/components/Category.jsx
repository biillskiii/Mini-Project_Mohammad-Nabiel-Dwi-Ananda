import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Category = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const handleSelectAll = () => {
    setSelectedCategory("All");
    onSelectCategory("All");
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
        Smartphone <IoIosArrowDown className="ml-1" />
      </button>
      <button
        className={`px-2 py-1 rounded-md text-sm font-semibold flex items-center${
          selectedCategory === "laptops" ? " bg-green-600 text-white" : ""
        }`}
        onClick={() => handleCategorySelect("laptops")}
      >
        Laptop <IoIosArrowDown className="ml-1" />
      </button>
      <button
        className={`px-2 py-1 rounded-md text-sm font-semibold flex items-center${
          selectedCategory === "Aksesoris" ? " bg-green-600 text-white" : ""
        }`}
        onClick={() => handleCategorySelect("Aksesoris")}
      >
        Aksesoris<IoIosArrowDown className="ml-1" />
      </button>
    </div>
  );
};

export default Category;
