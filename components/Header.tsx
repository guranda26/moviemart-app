import { signOutAction } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GiExitDoor } from "react-icons/gi";

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
                  src={"/assets/logo2.png"}
                  alt="logo"
                  width={70}
                  height={80}
                />
                {/* <Image src={"/assets/logo3.png"} alt="logo" width={50} height={50} />
          <Image src={"/assets/logo4.png"} alt="logo" width={50} height={80} /> */}
              </Link>
            </li>
            <li>
              <Link href={"/blogs"} className="text-2xl">
                Blogs
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
