import Link from "next/link";
import React from "react";

const AuthFooter = () => {
  return (
    <footer className="text-white text-xs flex flex-col sm:flex-row h-full gap-2 justify-center text-center">
      <Link className="hover:text-[#c6c6c6]" href={"/privacy-policy"}>
        Privacy Policy
      </Link>{" "}
      <span className="sm:inline-block hidden">|</span>
      <Link className="hover:text-[#c6c6c6]" href={"/terms-and-conditions"}>
        {" "}
        Terms and condition
      </Link>
    </footer>
  );
};

export default AuthFooter;
