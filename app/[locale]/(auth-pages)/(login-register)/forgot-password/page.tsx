import React from "react";
import Link from "next/link";
import Input from "@/components/Input";
import TextDivider from "@/components/TextDivider";
import { forgotPasswordAction } from "@/actions";
import OAuthProviders from "@/components/auth/OAuthProviders";
import CustomMsg from "@/components/CustomMsg";
import initTranslations from "@/utils/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { Props } from "@/Types/types";

export type MessageProps = {
  success?: "success";
  error?: "error";
};

const ForgotPassword = async ({ params, searchParams }: Props) => {
  const message = await searchParams;
  const { locale } = await params;

  const sucessMsg = (message as MessageProps)?.success;
  const errorMsg = (message as MessageProps)?.error;

  const i18nNameSpaces = ["auth", "common"];
  const { t, resources } = await initTranslations(locale, i18nNameSpaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNameSpaces}
    >
      <h2 className="sm:text-2xl xs:text-xl text-md font-semibold text-[#e3e2e2]">
        {t("auth:forgot_pass")}
      </h2>
      <p className="text-[#c6c6c6] text-sm mb-2 mt-1 font-semibold">
        {t("auth:no_worries")}
      </p>
      <form className="flex flex-col gap-4 pt-6 pb-4">
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white mb-2"
          data-cy="email-input"
        />
        <button
          type="submit"
          className="xs:w-[100%] py-3 rounded-md bg-purpleButton hover:bg-hoverPurpleBtn text-white text-md font-bold"
          formAction={forgotPasswordAction}
        >
          {t("auth:reset_pass")}
        </button>
      </form>
      <TextDivider />
      <OAuthProviders />
      <p className="text-xs text-wrap sm:text-sm flex flex-wrap justify-center md:textmd text-white text-center mt-2">
        <span>{t("auth:return")}&nbsp;</span>
        <Link
          className="font-medium underline text-white"
          href="/sign-in"
          data-cy="sign-in"
        >
          {t("auth:sign_in")}
        </Link>
      </p>
      {sucessMsg && <CustomMsg action={"success"} msg={sucessMsg} />}
      {errorMsg && <CustomMsg action={"error"} msg={errorMsg} />}
    </TranslationsProvider>
  );
};

export default ForgotPassword;
