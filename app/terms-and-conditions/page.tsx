import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <section className="px-4 py-8 bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Terms and Conditions
      </h2>
      <p className="mb-4 text-lg leading-relaxed">
        Welcome to MovieMart! These Terms and Conditions outline the rules and
        regulations for the use of our website and services.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        By accessing this website, we assume you accept these Terms and
        Conditions in full. Do not continue to use MovieMart&apos;s website if
        you do not agree to all the terms stated on this page.
      </p>
      <ol className="list-decimal list-inside space-y-6 text-lg">
        <li>
          <p className="mb-2 font-semibold">Use of the Website</p>
          <p className="leading-relaxed">
            You must be at least 18 years old to use our services. By accessing
            or using the website, you agree to comply with these Terms and all
            applicable laws and regulations.
          </p>
        </li>
        <li>
          <p className="mb-2 font-semibold">Intellectual Property Rights</p>
          <p className="leading-relaxed">
            Unless otherwise stated, MovieMart and/or its licensors own the
            intellectual property rights for all material on the website. All
            rights are reserved. You may access material from MovieMart for your
            personal use, subject to restrictions set in these terms.
          </p>
        </li>
        <li>
          <p className="mb-2 font-semibold">Prohibited Activities</p>
          <p className="leading-relaxed">You are prohibited from:</p>
          <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
            <li>Republishing, selling, or sub-licensing website content.</li>
            <li>
              Using the website in any way that damages the website or impairs
              its accessibility.
            </li>
            <li>
              Using the website for unlawful activities or violating
              regulations.
            </li>
          </ul>
        </li>
        <li>
          <p className="mb-2 font-semibold">Limitation of Liability</p>
          <p className="leading-relaxed">
            MovieMart will not be held liable for any damages arising from your
            use of the website, including but not limited to indirect or
            consequential damages, loss of data, or loss of profit.
          </p>
        </li>
        <li>
          <p className="mb-2 font-semibold">Termination</p>
          <p className="leading-relaxed">
            We reserve the right to terminate or suspend your access to our
            website at our discretion, without prior notice, for any reason
            including breach of these Terms.
          </p>
        </li>
        <li>
          <p className="mb-2 font-semibold">Changes to Terms</p>
          <p className="leading-relaxed">
            MovieMart reserves the right to update these Terms and Conditions at
            any time. Continued use of the website after any changes signifies
            your agreement to the new terms.
          </p>
        </li>
        <li>
          <p className="mb-2 font-semibold">Contact Information</p>
          <p className="leading-relaxed">
            If you have any questions about these Terms and Conditions, please
            contact us at{" "}
            <a
              href="mailto:moviemart@mail.com"
              className="text-blue-500 underline hover:text-blue-700"
            >
              moviemart@mail.com
            </a>
            .
          </p>
        </li>
      </ol>
    </section>
  );
};

export default TermsAndConditionsPage;
