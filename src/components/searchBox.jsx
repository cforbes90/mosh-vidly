import React from "react";
//my-3 = margin on the y axis and 3 is the value
const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
