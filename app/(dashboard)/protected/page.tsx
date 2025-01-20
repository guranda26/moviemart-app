import { signOutAction } from "@/actions";
import React from "react";

const page = () => {
  return (
    <h1>
      Protected Page
      <form action={signOutAction}>
        <button type="submit">Sign out</button>
      </form>
    </h1>
  );
};

export default page;
