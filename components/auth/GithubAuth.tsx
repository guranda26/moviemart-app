import React from "react";
import { signinWithGithub, signinWithGoogle } from "../../actions";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

export default function GithubAuth() {
  return (
    <form className="flex items-center justify-center h-8">
      <button
        className="bg-[#747373] hover:bg-[#929191] p-2 rounded-full hover:cursor-pointer"
        formAction={signinWithGithub}
      >
        <FaGithub className="text-xl" />
      </button>
      <button
        className="bg-[#747373] hover:bg-[#929191] p-2 rounded-full hover:cursor-pointer"
        formAction={signinWithGoogle}
      >
        <FaGoogle className="text-xl" />
      </button>
    </form>
  );
}
