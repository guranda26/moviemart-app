import React from "react";
import Image from "next/image";
// import "react-toastify/dist/ReactToastify.css";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Input from "@/components/Input";
import PasswordDisplay from "@/components/PasswordDisplay";
import TextDivider from "@/components/TextDivider";

const user = "/assets/user.svg";

const Login = () => {
  //   toast.success("Successfully Logged in!", {
  //     position: "top-center",
  //     autoClose: 2000,
  //     closeOnClick: true,
  //   });

  return (
    <>
      <h2 className="xs:text-2xl text-xl font-semibold text-[#e3e2e2]">
        Welcome Back, Movieholik!
      </h2>
      <p className="text-[#c6c6c6] text-sm mb-4 mt-1 font-semibold">
        Pick up where you left off.
      </p>
      <div className="flex flex-col gap-4 pt-6 pb-4">
        <div className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white">
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className={`bg-[#363636] outline-none pl-4 w-full text-sm`}
            data-cy="email-input"
          />
          <Image
            src={user}
            alt="key-icon"
            width={16}
            height={16}
            className="absolute top-[8px] left-1.5 translate-y-[50%]"
          />
        </div>
        <PasswordDisplay leftPadding="4" />
        <button
          type="submit"
          className="xs:w-[100%] py-3 rounded-md bg-redButton hover:bg-hoverRedBtn text-white text-md font-bold"
        >
          Sign In
        </button>
      </div>
      <Link
        href={"/forgot-password"}
        className="text-sm inline-block text-white hover:text-[#ccc] font-semibold text-center mb-8 w-full"
      >
        Forgot password?
      </Link>
      <TextDivider />
      <div className="flex items-center justify-center h-8">
        <div className="bg-[#747373] hover:bg-[#929191] p-2 rounded-full hover:cursor-pointer">
          <FaGithub className="text-xl" />
        </div>
      </div>
      <p className="text-xs text-wrap sm:text-sm flex flex-wrap justify-center md:textmd text-white text-center mt-2">
        <span>Don&apos;t have an account?&nbsp;</span>
        <Link
          className="font-medium underline text-white"
          href="/sign-up"
          data-cy="sign-up"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default Login;
