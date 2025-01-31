import React from "react";

const AboutUsPage = () => {
  return (
    <section className="px-6 py-12 bg-background text-textCol max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-8">
        About Us
      </h2>
      <p className="mb-6 text-lg leading-relaxed text-textCol">
        Welcome to <span className="font-semibold">MovieMart</span>, a platform designed to bring you the best movie
        experiences! We are committed to providing high-quality entertainment options and a seamless browsing experience.
      </p>
      <p className="mb-8 text-lg leading-relaxed text-textCol">
        Our mission is to help movie lovers discover their next favorite film. Whether you enjoy the latest blockbusters
        or timeless classics, we’ve got something for everyone.
      </p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="mb-3 text-xl font-semibold text-white inline-block">Our Story</h3>
        <p className="leading-relaxed text-gray-300">
          MovieMart was founded by a group of passionate movie enthusiasts with a shared goal: to create a user-friendly
          platform that helps people find movies they will love. With years of experience in the entertainment industry, we
          have built MovieMart into a one-stop shop for movie discovery.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold text-white inline-block">Our Vision</h3>
        <p className="leading-relaxed text-gray-300">
          Our vision is to revolutionize the way people discover and enjoy films by offering personalized recommendations,
          movie reviews, and a wide range of films from every genre and region. We aim to connect movie lovers across the
          globe and provide them with a space to share their love for cinema.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-semibold text-white inline-block">Our Values</h3>
        <ul className="list-disc list-inside pl-6 mt-3 space-y-2 text-gray-400">
          <li>Passion for films and entertainment.</li>
          <li>Commitment to user satisfaction and experience.</li>
          <li>Innovation in providing movie recommendations and reviews.</li>
          <li>Respect for diversity in cinema, embracing all cultures and genres.</li>
        </ul>

        <h3 className="mt-6 mb-3 text-xl font-semibold text-white inline-block">Get Involved</h3>
        <p className="leading-relaxed text-gray-300">
          If you are as passionate about movies as we are and would like to be part of our community, feel free to reach out
          to us! We&apos;re always excited to connect with movie enthusiasts and welcome new ideas. Join us and help make MovieMart
          the best place for discovering films.
        </p>
      </div>
    </section>
  );
};

export default AboutUsPage;
