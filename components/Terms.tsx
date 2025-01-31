import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <section className="px-6 py-12 bg-background text-textCol max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-8">
        Terms and Conditions
      </h2>
      <p className="mb-6 text-lg leading-relaxed text-textCol">
        Welcome to <span className="font-semibold">MovieMart</span>! These Terms and Conditions outline the rules and
        regulations for the use of our website and services.
      </p>
      <p className="mb-8 text-lg leading-relaxed text-textCol">
        By accessing this website, we assume you accept these Terms and
        Conditions in full. Do not continue to use <span className="font-semibold">MovieMart</span>&apos;s website if
        you do not agree to all the terms stated on this page.
      </p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <ol className="list-decimal text-white list-inside space-y-8 text-lg">
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Use of the Website</h3>
            <p className="leading-relaxed text-gray-300">
              You must be at least 18 years old to use our services. By accessing
              or using the website, you agree to comply with these Terms and all
              applicable laws and regulations.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Intellectual Property Rights</h3>
            <p className="leading-relaxed text-gray-300">
              Unless otherwise stated, <span className="font-semibold">MovieMart</span> and/or its licensors own the
              intellectual property rights for all material on the website. All
              rights are reserved. You may access material from <span className="font-semibold">MovieMart</span> for your
              personal use, subject to restrictions set in these terms.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Prohibited Activities</h3>
            <p className="leading-relaxed text-gray-300">You are prohibited from:</p>
            <ul className="list-disc list-inside pl-6 mt-3 space-y-2 text-gray-400">
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
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Limitation of Liability</h3>
            <p className="leading-relaxed text-gray-300">
              <span className="font-semibold">MovieMart</span> will not be held liable for any damages arising from your
              use of the website, including but not limited to indirect or
              consequential damages, loss of data, or loss of profit.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Termination</h3>
            <p className="leading-relaxed text-gray-300">
              We reserve the right to terminate or suspend your access to our
              website at our discretion, without prior notice, for any reason
              including breach of these Terms.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Changes to Terms</h3>
            <p className="leading-relaxed text-gray-300">
              <span className="font-semibold">MovieMart</span> reserves the right to update these Terms and Conditions at
              any time. Continued use of the website after any changes signifies
              your agreement to the new terms.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Contact Information</h3>
            <p className="leading-relaxed text-gray-300">
              If you have any questions about these Terms and Conditions, please
              contact us at{" "}
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
