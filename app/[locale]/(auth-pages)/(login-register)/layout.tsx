import "../.././globals.css";
import AuthHeader from "@/components/header/AuthHeader";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen flex flex-col">
      <AuthHeader />
      <section
        className="flex items-center justify-center max-h-screen bg-bgAuth p-4 flex-1"
        suppressHydrationWarning={true}
      >
        <div className="bg-circle-background w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-full absolute left-4"></div>
        <div className="bg-circle-background w-[150px] h-[150px] rounded-full absolute left-1/4 top-1/2"></div>
        <div className="bg-authForm border-2 border-white rounded-lg shadow-lg w-full max-w-sm p-8 pt-10 z-10">
          {children}
        </div>
        <div className="bg-circle-background w-[150px] h-[150px] rounded-full absolute top-3/4 right-14"></div>
        <div className="bg-circle-background w-[75px] h-[75px] rounded-full absolute top-10 right-20"></div>
        <div className="bg-circle-background w-[38px] h-[38px] rounded-full fixed top-1/2 right-1/4"></div>
      </section>
    </section>
  );
}
