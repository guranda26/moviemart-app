import { signOutAction } from "@/actions";
import React from "react";

const Header = () => {
  return (
    <section>
      <header
        style={{
          backgroundColor: "lightblue",
          padding: "1rem",
        }}
        className="flex justify-between"
      >
        <p>Header</p>
        <form action={signOutAction}>
          <button type="submit" className="font-bold">
            Sign out
          </button>
        </form>
      </header>
    </section>
  );
};

export default Header;
