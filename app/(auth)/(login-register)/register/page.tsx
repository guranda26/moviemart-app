"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
const closedEye = "/assets/closed-eye.svg";
const eye = "/assets/eye.svg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordDisplay = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <h2 className="xs:text-2xl text-xl font-semibold text-[#e3e2e2]">
        Let&apos;s Get Started!
      </h2>
      <p className="text-[#c6c6c6] text-sm mb-4 mt-1 font-semibold">
        Dive into the best movies and series with us.
      </p>
      <div className="flex flex-col gap-4 pt-6 pb-4">
        <input
          type={"text"}
          name="fullname"
          id="fullname"
          data-cy="username-input"
          placeholder="Username"
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white"
          autoComplete="false"
          required
        />
        <input
          name="email"
          id="email"
          data-cy="email-input"
          placeholder="Email"
          required
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white"
        />
        <div className="relative w-[100%] bg-[#363636] mx-auto p-3 mb-4 border rounded border-white sm:text-sm md:text-base text-white">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            data-cy="password-input"
            placeholder="Passwoerd"
            className={`bg-[#363636] outline-none w-[100%] text-sm`}
            autoComplete="false"
            required
          />
          <Image
            src={!showPassword ? closedEye : eye}
            alt="eye-icon"
            width={16}
            height={16}
            className="absolute top-[8px] right-1 translate-y-[50%] hover:cursor-pointer"
            onClick={handlePasswordDisplay}
          />
        </div>
        <button
          type="submit"
          className="xs:w-[100%] py-3 rounded-md bg-purpleButton hover:bg-hoverPurpleBtn text-white text-md font-bold"
        >
          Sign Up
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
        <span>Already Registered?&nbsp;</span>
        <Link
          className="font-medium underline text-white"
          href="/login"
          data-cy="login"
        >
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;
