import React from "react";

const PrivacyPage = () => {
  return (
    <section className="px-4 py-8 bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Privacy Policy
      </h2>
      <p className="mb-4 text-lg leading-relaxed">
        Welcome to MovieMart. We prioritize your privacy and are committed to
        safeguarding your personal information.
      </p>
      <p className="mb-4 text-lg leading-relaxed">
        This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you visit our website.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        Please read this Privacy Policy carefully. If you do not agree with the
        terms of this Privacy Policy, please do not access the Website.
      </p>
      <ol className="list-decimal list-inside space-y-6 text-lg">
        <li>
          <p className="mb-2 font-semibold">Information We Collect</p>
          <p className="leading-relaxed">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
            <li>
              <strong>Personal Information:</strong> Information such as your
              name, email address, phone number, payment details, and any other
              information you provide when creating an account, subscribing, or
              purchasing a movie.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about your interactions
              with our Website, including IP address, browser type, device type,
              pages visited, and the time and date of your visits.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> Data collected
              through cookies, web beacons, or similar tracking technologies.
            </li>
          </ul>
        </li>
        <li>
          <p className="mb-2 font-semibold">How We Use Your Information</p>
          <p className="leading-relaxed">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
            <li>
              To provide and manage our services, including subscriptions and
              purchases.
            </li>
            <li>To process transactions and send confirmation emails.</li>
            <li>
              To communicate with you regarding updates, promotional offers, or
              customer support.
            </li>
            <li>
              To analyze and improve the functionality and user experience of
              our Website.
            </li>
            <li>
              To comply with legal obligations and prevent fraudulent or illegal
              activity.
            </li>
          </ul>
        </li>
        <li>
          <p className="mb-2 font-semibold">How We Share Your Information</p>
          <p className="leading-relaxed">
            We may share your information with third parties in the following
            cases:
          </p>
          <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
            <li>
              <strong>Service Providers:</strong> With vendors and partners who
              assist us in delivering our services (e.g., payment processors,
              hosting providers).
            </li>
            <li>
              <strong>Legal Requirements:</strong> To comply with applicable
              laws, regulations, or legal proceedings.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger,
              sale, or transfer of all or part of our business.
            </li>
          </ul>
        </li>
        <li>
          <p className="mb-2 font-semibold">Your Rights</p>
          <p className="leading-relaxed">
            Depending on your location, you may have certain rights under
            applicable data protection laws, including:
          </p>
          <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
            <li>
              Accessing, correcting, or deleting your personal information.
            </li>
            <li>Opting out of receiving promotional communications.</li>
            <li>Managing cookie preferences through your browser settings.</li>
          </ul>
        </li>
        <li>
          <p className="mb-2 font-semibold">Security</p>
          <p className="leading-relaxed">
            We use reasonable administrative, technical, and physical measures
            to protect your personal information. However, no method of
            transmission over the Internet or electronic storage is 100% secure.
          </p>
        </li>
        <li>
          <p className="mb-2 font-semibold">Changes to This Privacy Policy</p>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. The
            <span className="font-semibold">
              {" "}
              &quot;Effective Date&quot;{" "}
            </span>{" "}
            at the top of this page indicates when this Privacy Policy was last
            revised.
          </p>
        </li>
        <li>
          <p className="mb-2 font-semibold">Contact Us</p>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
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

export default PrivacyPage;
