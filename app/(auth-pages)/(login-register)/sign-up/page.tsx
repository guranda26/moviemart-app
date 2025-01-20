import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Input from "@/components/Input";
import PasswordDisplay from "@/components/PasswordDisplay";
import TextDivider from "@/components/TextDivider";
import { signUpAction } from "@/actions";

const Register = () => {
  return (
    <>
      <h2 className="xs:text-2xl text-xl font-semibold text-[#e3e2e2]">
        Let&apos;s Get Started!
      </h2>
      <p className="text-[#c6c6c6] text-sm mb-4 mt-1 font-semibold">
        Dive into the best movies and series with us.
      </p>
      <form className="flex flex-col gap-4 pt-6 pb-4">
        <Input
          type={"text"}
          name="username"
          id="username"
          placeholder="Username"
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white"
          data-cy="username-input"
        />
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white"
          data-cy="email-input"
        />
        <PasswordDisplay showIcon={false} />
        <button
          type="submit"
          className="xs:w-[100%] py-3 rounded-md bg-purpleButton hover:bg-hoverPurpleBtn text-white text-md font-bold"
          formAction={signUpAction}
        >
          Sign Up
        </button>
      </form>
      <TextDivider />
      <div className="flex items-center justify-center h-8">
        <div className="bg-[#747373] hover:bg-[#929191] p-2 rounded-full hover:cursor-pointer">
          <FaGithub className="text-xl" />
        </div>
      </div>
      <p className="text-xs text-wrap sm:text-sm flex flex-wrap justify-center md:textmd text-white text-center mt-2">
        <span>Already Registered?&nbsp;</span>
        <Link
          className="font-medium underline text-white"
          href="/sign-in"
          data-cy="sign-in"
        >
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;
