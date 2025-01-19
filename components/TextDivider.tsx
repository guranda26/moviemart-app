import React from "react";

const TextDivider = () => {
  return (
    <div className="flex text-[#959494] items-center gap-4 mb-4">
      <div className="flex-1 bg-[#959494] h-[1px]"></div>
      <span className="text-sm">Or</span>
      <div className="flex-1 bg-[#959494] h-[1px]"></div>
    </div>
  );
};

export default TextDivider;
