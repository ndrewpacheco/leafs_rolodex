import React from "react";

const SearchInput = ({ value, handleOnChange, type }) => {
  return (
    <input
      type='text'
      placeholder={`Search by ${type}`}
      value={value}
      onChange={handleOnChange}
      className='search-input'
    />
  );
};

export default SearchInput;
