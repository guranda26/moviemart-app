'use client'

import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPageComponent= () => {
  const {t} = useTranslation()

  return (
    <section className="px-6 py-12 bg-background text-textCol max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-8">
        {t("privacy_policy:privacy_policy")}
      </h2>
      <p className="mb-6 text-lg leading-relaxed text-textCol">
        {t("about_us:welcome")} <span className="font-semibold">MovieMart</span>. {t("privacy_policy:prioritize")}
      </p>
      <p className="mb-8 text-lg leading-relaxed text-textCol">
        {t("privacy_policy:explain")}
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <ol className="list-decimal text-white list-inside space-y-8 text-lg">
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("privacy_policy:information")}</h3>
            <p className="leading-relaxed text-gray-300">
            {t("privacy_policy:collect")}
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("privacy_policy:information_use")}</h3>
            <p className="leading-relaxed text-gray-300">
              {t("privacy_policy:use")}
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("privacy_policy:information_share")}</h3>
            <p className="leading-relaxed text-gray-300">{t("privacy_policy:share")}</p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("privacy_policy:rights")}</h3>
            <p className="leading-relaxed text-gray-300">
              {t('about_us:rights_explain')}
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("privacy_policy:security")}</h3>
            <p className="leading-relaxed text-gray-300">
            {t("privacy_policy:security_explain")}
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("privacy_policy:updates")}</h3>
            <p className="leading-relaxed text-gray-300">
            {t("privacy_policy:updates_explain")}
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("privacy_policy:contact_us")}</h3>
            <p className="leading-relaxed text-gray-300">
            {t("privacy_policy:contact-explain")}
              <a
                href="mailto:moviemart@mail.com"
                className="text-blue-400 underline hover:text-blue-500 transition"
              >
                moviemart@mail.com
              </a>
              .
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default PrivacyPageComponent;
