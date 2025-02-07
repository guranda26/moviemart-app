'use client'

import React from "react";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {

  const {t} = useTranslation()

  return (
    <section className="px-6 py-12 bg-background text-textCol max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-8">
        {t("about_us:about")}
      </h2>
      <p className="mb-6 text-lg leading-relaxed text-textCol">
      {t("about_us:welcome")} <span className="font-semibold">MovieMart</span>, {t("about_us:platform")}
      </p>
      <p className="mb-8 text-lg leading-relaxed text-textCol">
      {t("about_us:mission")}
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="mb-3 text-xl font-semibold text-white inline-block">{t("about_us:our_story")}
        </h3>
        <p className="leading-relaxed text-gray-300">
          {t("about_us:story")}
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold text-white inline-block"> {t("about_us:our_vision")} </h3>
        <p className="leading-relaxed text-gray-300">
          {t("about_us:vision")}
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold text-white inline-block">{t("about_us:our_values")}</h3>
        <ul className="list-disc list-inside pl-6 mt-3 space-y-2 text-gray-400">
          <li>{t("about_us:first_value")}</li>
          <li>{t("about_us:second_value")}</li>
          <li>{t("about_us:third_value")}</li>
          <li>{t("about_us:forth_value")}</li>
        </ul>

        <h3 className="mt-6 mb-3 text-xl font-semibold text-white inline-block">{t("about_us:get_involved")}</h3>
        <p className="leading-relaxed text-gray-300">
         {t("about_us:vision")}
        </p>
      </div>
    </section>
  );
};

export default AboutUsPage;
