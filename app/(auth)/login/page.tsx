import AuthFooter from "@/components/footer/AuthFooter";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-col items-center justify-between bg-black min-h-screen">
      <section className="flex flex-col items-center justify-center bg-black-700 bg-hero-background bg-cover bg-center bg-no-repeat min-h-[85vh] w-full text-white text-5xl font-bold">
        Login
      </section>
      <section className="h-full mb-6">
        <AuthFooter />
      </section>
    </section>
  );
};

export default page;
