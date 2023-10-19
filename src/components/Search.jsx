import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
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
  );
};

export default SearchInput;
