import { resetPasswordAction } from "@/actions";
import { FormMessage, Message } from "@/components/auth/FormMessage";
import Input from "@/components/Input";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { redirect } from "next/navigation";
import SuccessMsg from "@/components/SuccessMsg";

export type SuccessMsgProp = {
  success: string;
};

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  console.log(searchParams);

  const successMsg = (searchParams as SuccessMsgProp).success;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#252525] p-4 text-white">
      {" "}
      <div className="text-left">
        <h1 className="text-2xl font-medium">Reset password</h1>
        <p className="text-sm text-foreground/60">
          Please enter your new password below.
        </p>
      </div>
      <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="New password"
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white mb-2"
        />
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white mb-2"
        />
        <button
          formAction={resetPasswordAction}
          type="submit"
          className="xs:w-[100%] py-3 rounded-md bg-purpleButton hover:bg-hoverPurpleBtn text-white text-md font-bold"
        >
          Reset password
        </button>
      </form>
      <FormMessage message={searchParams} />
      {/* <ToastContainer /> */}
      {successMsg && <SuccessMsg msg={successMsg} />}
    </section>
  );
}
