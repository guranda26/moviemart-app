import AuthFooter from "@/components/footer/AuthFooter";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-col items-center justify-between bg-black min-h-screen relative">
      <section className="flex flex-col items-center justify-center bg-black-700 bg-hero-background bg-cover bg-center bg-no-repeat min-h-[85vh] w-full text-[#e5e5e5] sm:text-4xl text-2xl font-bold relative">
        <div className="absolute inset-0 bg-overlay"></div>
        <div className="relative z-10 flex flex-col items-center justify-center mt-auto px-4">
          <div className="flex flex-col gap-4 items-center mb-4">
            <h1 className="sm:text-6xl xs:text-4xl text-2xl">MovieMart</h1>
            <h3 className="text-center">Start Your Journey With Us</h3>
            <p className="text-xs text-[#c6c6c6] text-center">
              Be the first one to watch the latest movies & Series on MovieMart
            </p>
          </div>
          <div className="flex flex-col gap-4 items-cente">
            <Link
              href="/login"
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-redButton text-background gap-2 hover:bg-hoverRedBtn dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 xs:px-8 sm:px-10 w-full"
              rel="noopener noreferrer"
            >
              Login
            </Link>
            <Link
              href="/subscribe"
              className="rounded-lg border border-solid border-redButton transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-hoverDarkBtn dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 xs:px-8 sm:px-10 w-full"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </section>
      <section className="h-full mb-6">
        <AuthFooter />
      </section>
    </section>
  );
};

export default page;
