import { Suspense } from "react";
import "../.././globals.css";
import Loading from "@/components/Loading";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <section
        className="flex items-center justify-center min-h-screen bg-[#252525] p-4"
        suppressHydrationWarning={true}
      >
        <div className="bg-circle-background w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-full absolute left-4"></div>
        <div className="bg-circle-background w-[150px] h-[150px] rounded-full absolute left-1/4 top-1/2"></div>
        <div className="bg-[#181818] border-2 border-white rounded-lg shadow-lg w-full max-w-sm p-8 pt-10 z-10">
          {children}
        </div>
        <div className="bg-circle-background w-[150px] h-[150px] rounded-full absolute top-3/4 right-14"></div>
        <div className="bg-circle-background w-[75px] h-[75px] rounded-full absolute top-10 right-20"></div>
        <div className="bg-circle-background w-[38px] h-[38px] rounded-full fixed top-1/2 right-1/4"></div>
      </section>
    </Suspense>
  );
}
