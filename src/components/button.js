import React from "react";

export const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 rounded-md font-semibold text-white transition-all ${
        disabled
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
    >
      {children}
    </button>
  );
};
