import { signOutAction } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GiExitDoor } from "react-icons/gi";
import { LuCircleUserRound } from "react-icons/lu";
import "react-tooltip/dist/react-tooltip.css";

const Header = () => {
  return (
    <section>
      <header
        style={{
          padding: "1rem",
        }}
        className="flex justify-between max-w-screen bg-yellow-500"
      >
        <nav className="w-full px-10">
          <ul className="flex items-center justify-between">
            <li>
              <Link href={"/"}>
                <Image
                  src={"/assets/logo.png"}
                  alt="logo"
                  width={70}
                  height={80}
                />
              </Link>
            </li>
            <li>
              <Link href={"/blogs"} className="text-2xl">
                Blogs
              </Link>
            </li>
            <li>
              <Link href={"/contact"} className="text-2xl">
                Contact
              </Link>
            </li>
            <li className="relative group">
              <Link href="/profile" className="text-2xl relative">
                <LuCircleUserRound />
                {/* Tooltip */}
                <span className="hidden md:inline-block absolute left-1/2 -translate-x-1/2 -top-10 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <form action={signOutAction} className="">
                <button
                  type="submit"
                  className="font-bold flex flex-col items-center"
                >
                  <GiExitDoor width={20} className="text-3xl" />
                  <span>Sign out</span>
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Header;
