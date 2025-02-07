'use client'

import React from "react";
import { useTranslation } from "react-i18next";

const TermsAndConditionsPage = () => {
  const {t} = useTranslation()

  return (
    <section className="px-6 py-12 bg-background text-textCol max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-8">
        {t("terms_conditions:terms_and_conditions")}
      </h2>
      <p className="mb-6 text-lg leading-relaxed text-textCol">
      {t("terms_conditions:welcome")} <span className="font-semibold">MovieMart</span>! {t("terms_conditions:regulations")}
      </p>
      <p className="mb-8 text-lg leading-relaxed text-textCol">
      {t("terms_conditions:acceptance")} <span className="font-semibold">MovieMart</span>
        {t("terms_conditions:reject")}
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <ol className="list-decimal text-white list-inside space-y-8 text-lg">
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("terms_conditions:use")}</h3>
            <p className="leading-relaxed text-gray-300">
            {t("terms_conditions:agree")}
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("terms_conditions:property")}</h3>
            <p className="leading-relaxed text-gray-300">
            {t("terms_conditions:pre_text")} <span className="font-semibold">MovieMart</span> {t("terms_conditions:intellectual_property")} <span className="font-semibold">MovieMart</span> {t("terms_conditions:usage")}
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("terms_conditions:restrictions")} </h3>
            <p className="leading-relaxed text-gray-300">{t("terms_conditions:restrict-text")}</p>
            <ul className="list-disc list-inside pl-6 mt-3 space-y-2 text-gray-400">
              <li>{t("terms_conditions:first_restriction")}</li>
              <li>{t("terms_conditions:second_restriction")}</li>
              <li>{t("terms_conditions:third-restriction")}</li>
            </ul>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("terms_conditions:limitations")}</h3>
            <p className="leading-relaxed text-gray-300">
              <span className="font-semibold">MovieMart</span> {t("terms_conditions:limitation-text")}
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("terms_conditions:termination")}</h3>
            <p className="leading-relaxed text-gray-300">
              {t("terms_conditions:termination-text")}            
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("terms_conditions:changes")}</h3>
            <p className="leading-relaxed text-gray-300">
              <span className="font-semibold">MovieMart</span> {t("terms_conditions:changes_text")}
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("terms_conditions:contact")}</h3>
            <p className="leading-relaxed text-gray-300">
            {t("terms_conditions:contact_text")}              
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

export default TermsAndConditionsPage;
