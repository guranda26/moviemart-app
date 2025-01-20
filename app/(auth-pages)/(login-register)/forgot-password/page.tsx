import React from "react";
import Link from "next/link";
import Input from "@/components/Input";
import { FormMessage, Message } from "@/components/auth/FormMessage";
import TextDivider from "@/components/TextDivider";
import { forgotPasswordAction } from "@/actions";
import OAuthProviders from "@/components/auth/OAuthProviders";
import CustomMsg from "@/components/CustomMsg";

export type MessageProps = {
  success?: "success";
  error?: "error";
};

const ForgotPassword = async (props: { searchParams: Promise<Message> }) => {
  const searchParams = await props.searchParams;

  const sucessMsg = (searchParams as MessageProps)?.success;
  const errorMsg = (searchParams as MessageProps)?.error;

  console.log("which?", sucessMsg, errorMsg);

  return (
    <>
      <h2 className="sm:text-2xl xs:text-xl text-md font-semibold text-[#e3e2e2]">
        Forgot Password?
      </h2>
      <p className="text-[#c6c6c6] text-sm mb-2 mt-1 font-semibold">
        No worries! Please enter your email.
      </p>
      <form className="flex flex-col gap-4 pt-6 pb-4">
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white mb-2"
          data-cy="email-input"
        />
        <button
          type="submit"
          className="xs:w-[100%] py-3 rounded-md bg-purpleButton hover:bg-hoverPurpleBtn text-white text-md font-bold"
          formAction={forgotPasswordAction}
        >
          Reset Password
        </button>
      </form>
      <TextDivider />
      <OAuthProviders />
      <p className="text-xs text-wrap sm:text-sm flex flex-wrap justify-center md:textmd text-white text-center mt-2">
        <span>Return back?&nbsp;</span>
        <Link
          className="font-medium underline text-white"
          href="/sign-in"
          data-cy="sign-in"
        >
          Sign In
        </Link>
      </p>
      {sucessMsg ? (
        <CustomMsg action={"success"} msg={sucessMsg} />
      ) : errorMsg ? (
        <CustomMsg action={"error"} msg={errorMsg} />
      ) : (
        <CustomMsg action={"error"} msg={"error"} />
      )}
      <FormMessage message={searchParams} />
    </>
  );
};

export default ForgotPassword;
