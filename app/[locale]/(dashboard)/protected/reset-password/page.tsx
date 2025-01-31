import { Message } from "@/components/auth/FormMessage";
import "react-toastify/dist/ReactToastify.css";
import CustomMsg from "@/components/CustomMsg";
import ValidatePassword from "@/components/auth/ValidatePassword";
import { redirect } from "next/navigation";
import SuccessMsg from "@/components/SuccessMsg";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/utils/i18n";

export type SuccessMsgProp = {
  success: string;
};

export type ErrorMsgProp = {
  error: string;
};

export default async function ResetPassword({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Message>;
}) {

  const { locale } = await params;
  const searchParamsResolved = await searchParams;

  const successMsg = (searchParamsResolved as SuccessMsgProp).success;
  const errorMsg = (searchParamsResolved as ErrorMsgProp).error;

  const i18nNameSpace = ["common", "auth"];
  const { t, resources } = await initTranslations(locale, i18nNameSpace);

  if (successMsg) {
    setTimeout(() => {
      redirect("/");
    }, 0);
  }

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNameSpace}
    >
      <section className="flex flex-col items-center justify-center min-h-screen bg-bgAuth p-4 text-white flex-1 w-full">
        <div className="flex-col items-center justify-center bg-authForm border-2 border-white rounded-lg shadow-lg p-8 pt-10">
          <div className="px-4">
            <h1 className="text-xl xs:text-2xl font-medium mb-2">
              {t("auth:reset_pass")}
            </h1>
            <p className="text-sm text-foreground/60">{t("auth:reset_msg")}</p>
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
        </div>
        {successMsg && <SuccessMsg msg={successMsg} />}
        {errorMsg && <CustomMsg action="error" msg={errorMsg} />}
      </section>
    </TranslationsProvider>
  );
}
