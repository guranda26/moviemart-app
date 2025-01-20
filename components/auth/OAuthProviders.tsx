import React from "react";
import { signinWithGithub, signinWithGoogle } from "../../actions";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function OAuthProviders() {
  const GoogleIcon = "/assets/google-icon.svg";
  return (
    <form className="flex items-center justify-center h-8 gap-2">
      <button
        className="bg-[#989898] hover:bg-[#a7a6a6] p-2 rounded-full hover:cursor-pointer"
        formAction={signinWithGithub}
      >
        <FaGithub className="text-xl" />
      </button>
      <button
        className="bg-[#989898] hover:bg-[#a7a6a6] p-2 rounded-full hover:cursor-pointer"
        formAction={signinWithGoogle}
      >
        <Image
          src={GoogleIcon}
          alt="google"
          width={16}
          height={16}
          className="xs:w-5 xs:h-5"
        />
      </button>
    </form>
  );
}
