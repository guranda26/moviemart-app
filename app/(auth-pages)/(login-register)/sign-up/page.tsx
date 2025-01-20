import React from "react";
import Link from "next/link";
import Input from "@/components/Input";
import PasswordDisplay from "@/components/PasswordDisplay";
import TextDivider from "@/components/TextDivider";
import { signUpAction } from "@/actions";
import OAuthProviders from "@/components/auth/OAuthProviders";
import { Message } from "@/components/auth/FormMessage";
import { MessageProps } from "../forgot-password/page";
import CustomMsg from "@/components/CustomMsg";

const Register = async (props: { searchParams: Promise<Message> }) => {
  const searchParams = await props.searchParams;
  const sucessMsg = (searchParams as MessageProps)?.success;
  const errorMsg = (searchParams as MessageProps)?.error;
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
          // pendingText="Signing up..."
          formAction={signUpAction}
        >
          Sign Up
        </button>
      </form>
      <TextDivider />
      <OAuthProviders />
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
      {sucessMsg ? (
        <CustomMsg action={"success"} msg={sucessMsg} />
      ) : errorMsg ? (
        <CustomMsg action={"error"} msg={errorMsg} />
      ) : null}
    </>
  );
};

export default Register;
