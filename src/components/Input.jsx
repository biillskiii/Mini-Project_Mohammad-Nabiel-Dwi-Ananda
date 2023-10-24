import React from "react";
const Input = ({type, placeholder, value, onChange }) => {
  return (
    <div className={`w-full h-full mx-auto`}>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        className={
          "w-full h-full rounded-md shadow-md focus:outline-none p-3 bg-white"
        }
      />
    </div>
  );  
};

export default Input;
