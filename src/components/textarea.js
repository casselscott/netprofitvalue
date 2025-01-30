import React from "react";

export const Textarea = ({ value, onChange, className, ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};
