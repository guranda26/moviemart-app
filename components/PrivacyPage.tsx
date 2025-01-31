import React from "react";

const PrivacyPageComponent= () => {
  return (
    <section className="px-6 py-12 bg-background text-textCol max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-8">
        Privacy Policy
      </h2>
      <p className="mb-6 text-lg leading-relaxed text-textCol">
        Welcome to <span className="font-semibold">MovieMart</span>. We prioritize your privacy and are committed to
        safeguarding your personal information.
      </p>
      <p className="mb-8 text-lg leading-relaxed text-textCol">
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      </p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <ol className="list-decimal text-white list-inside space-y-8 text-lg">
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Information We Collect</h3>
            <p className="leading-relaxed text-gray-300">
              We may collect personal information, usage data, and cookies as outlined in this Privacy Policy.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">How We Use Your Information</h3>
            <p className="leading-relaxed text-gray-300">
              The information we collect is used to provide our services, process transactions, communicate with users, and improve the website.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">How We Share Your Information</h3>
            <p className="leading-relaxed text-gray-300">We may share your information with third parties such as service providers or as required by law.</p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Your Rights</h3>
            <p className="leading-relaxed text-gray-300">
              Depending on your location, you may have rights to access, correct, or delete your personal information, or to opt-out of promotional communications.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Security</h3>
            <p className="leading-relaxed text-gray-300">
              We implement reasonable security measures to protect your personal information, but no method is entirely secure.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Changes to This Privacy Policy</h3>
            <p className="leading-relaxed text-gray-300">
              We may update this Privacy Policy from time to time. The &quot;Effective Date&quot; at the top of this page indicates when this Privacy Policy was last revised.
            </p>
          </li>
          <li>
            <h3 className="mb-3 text-xl font-semibold text-white inline-block">Contact Us</h3>
            <p className="leading-relaxed text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
