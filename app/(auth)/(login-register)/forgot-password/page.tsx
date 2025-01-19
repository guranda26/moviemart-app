import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <>
      <h2 className="xs:text-2xl text-xl font-semibold text-[#e3e2e2]">
        Forgot Password?
      </h2>
      <p className="text-[#c6c6c6] text-sm mb-2 mt-1 font-semibold">
        No worries! Please enter your email.
      </p>
      <div className="flex flex-col gap-4 pt-6 pb-4">
        <input
          name="email"
          id="email"
          data-cy="email-input"
          placeholder="example@mail.com"
          required
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white mb-2"
        />
        <button
          type="submit"
          className="xs:w-[100%] py-3 rounded-md bg-purpleButton hover:bg-hoverPurpleBtn text-white text-md font-bold"
        >
          Reset Password
        </button>
      </div>
      <div className="flex text-[#959494] items-center gap-4 mb-4">
        <div className="flex-1 bg-[#959494] h-[1px]"></div>
        <span className="text-sm">Or</span>
        <div className="flex-1 bg-[#959494] h-[1px]"></div>
      </div>
      <div className="flex items-center justify-center h-8">
        <div className="bg-[#747373] hover:bg-[#929191] p-2 rounded-full hover:cursor-pointer">
          <FaGithub className="text-xl" />
        </div>
      </div>
      <p className="text-xs text-wrap sm:text-sm flex flex-wrap justify-center md:textmd text-white text-center mt-2">
        <span>Don&apos;t have an account?&nbsp;</span>
        <Link
          className="font-medium underline text-white"
          href="/register"
          data-cy="register"
        >
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default ForgotPassword;
