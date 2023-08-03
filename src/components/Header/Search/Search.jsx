import React from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
const Search = ({setShowSearch}) => {
  return (
    <div className="search-modal">
      <div className="form-field">
        <input autoFocus type="text" placeholder="Search for products" />
        <MdClose className="close-btn" onClick={() => setShowSearch(false)} />
      </div>
    </div>
  );
};

export default Search;
