"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Input from "@/components/Input";
import PasswordDisplay from "@/components/PasswordDisplay";
import TextDivider from "@/components/TextDivider";
import { signInAction } from "@/actions";
import OAuthProviders from "@/components/auth/OAuthProviders";
import CustomMsg from "@/components/CustomMsg";
import { useRouter } from "next/navigation";

const user = "/assets/user.svg";

interface Message {
  success?: string;
  error?: string;
}

interface LoginProps {
  searchParams: Promise<Message>;
}

const Login: React.FC<LoginProps> = ({ searchParams }) => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await signInAction(formData);

    setLoading(false);
    if (result.success) {
      if (!isLoading) {
        router.push("/");
      }
    } else {
      if (result.error) {
        setErrorMessage(result.error);
      }
      throw new Error("Something went wrong!");
    }
  };

  useEffect(() => {
    (async () => {
      const messages = await searchParams;
      if (messages) {
        setErrorMessage(messages?.error || "");
      }
    })();
  }, [searchParams]);

  if (isLoading) return <p className="text-gray-500">Loading...</p>;

  return (
    <>
      <h2 className="xs:text-2xl text-xl font-semibold text-[#e3e2e2]">
        Welcome Back, Movieholik!
      </h2>
      <p className="text-[#c6c6c6] text-sm mb-4 mt-1 font-semibold">
        Pick up where you left off.
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 pt-6 pb-4">
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
          {isLoading ? "Logging in..." : "Sign In"}
        </button>
      </form>
      <Link
        href={"/forgot-password"}
        className="text-sm inline-block text-white hover:text-[#ccc] font-semibold text-center mb-8 w-full"
      >
        Forgot password?
      </Link>
      <TextDivider />
      <OAuthProviders />
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
      {errorMessage && <CustomMsg action="error" msg={errorMessage} />}
    </>
  );
};

export default Login;
