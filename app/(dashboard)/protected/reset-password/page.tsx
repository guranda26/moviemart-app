import { resetPasswordAction } from "@/actions";
import { FormMessage, Message } from "@/components/auth/FormMessage";
import Input from "@/components/Input";
import "react-toastify/dist/ReactToastify.css";
import CustomMsg from "@/components/CustomMsg";
import ValidatePassword from "@/components/auth/ValidatePassword";
import { redirect } from "next/navigation";
import SuccessMsg from "@/components/SuccessMsg";

export type SuccessMsgProp = {
  success: string;
};

export type ErrorMsgProp = {
  error: string;
};

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  const successMsg = (searchParams as SuccessMsgProp).success;
  const errorMsg = (searchParams as ErrorMsgProp).error;

  if (successMsg) {
    setTimeout(() => {
      redirect("/");
    }, 0);
  }
  // const handlePasswordSubmit = async (
  //   event: React.FormEvent<HTMLFormElement>
  // ) => {
  //   event.preventDefault();
  //   const response = await resetPasswordAction(new FormData(event.target));
  //   return response;
  // };
  // Use zod schema to validate the password and confirmPassword  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#252525] p-4 text-white">
      {" "}
      <div className="text-left">
        <h1 className="text-2xl font-medium">Reset password</h1>
        <p className="text-sm text-foreground/60">
          Please enter your new password below.
        </p>
      </div>
      <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4 relative">
        {/* <Input
          type="password"
          name="password"
          id="password"
          onChange={handlePasswordChange}
          value={password}
          placeholder="New password"
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white mb-2"
        /> */}
        <ValidatePassword />
        {/* <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white mb-2"
        />
        <button
          formAction={resetPasswordAction}
          type="submit"
          className="xs:w-[100%] py-3 rounded-md bg-purpleButton hover:bg-hoverPurpleBtn text-white text-md font-bold mb-20 xs:mb-5"
        >
          Reset password
        </button> */}
        {/* <FormMessage message={searchParams} /> */}
      </form>
      {successMsg && <SuccessMsg msg={successMsg} />}
      {errorMsg && <CustomMsg action="error" msg={errorMsg} />}
    </section>
  );
}
