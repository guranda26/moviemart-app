import React from "react";
import ThemeButton from "../button/ThemeButton";
import ToggleLanguage from "../ToggleLanguage";

const AuthHeader = () => {
  return (
    <header className="flex justify-between w-full py-6 px-2 xs:px-8 z-10 flex-wrap">
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
