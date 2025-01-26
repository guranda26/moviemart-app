import React from "react";
import ThemeButton from "../ThemeButton";
import ToggleLanguage from "../ToggleLanguage";

const AuthHeader = () => {
  return (
    <header className="flex justify-between w-full py-6 px-8 z-10">
      <div>
        <ThemeButton />
      </div>
      <div>
        <ToggleLanguage />
      </div>
    </header>
  );
};

export default AuthHeader;
