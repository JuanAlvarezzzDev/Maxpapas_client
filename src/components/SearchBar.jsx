import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, changeInput }) => {
  return (
    <div className="flex items-center border-b-2 border-primary/20 px-3 py-2 gap-2">
      <FaSearch className="searchBar-icon text-xl text-primary" />
      <input
        className=" placeholder:text-black bg-transparent w-full input-focus text-lg"
        style={{ outline: "none" }}
        type="text"
        placeholder="Buscar..."
        value={value}
        onChange={changeInput}
      />
    </div>
  );
};

export default SearchBar;
