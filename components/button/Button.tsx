import React from "react";

type HandleClick = {
  handleClick: () => void;
  children: React.ReactNode;
};

const Button: React.FC<HandleClick> = ({ handleClick, children }) => {
  return (
    <button
      className="bg-redButton hover:bg-hoverRedBtn border border-[#7e1313] text-white px-4 py-2 rounded-lg transition"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;