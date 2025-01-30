import React from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};
