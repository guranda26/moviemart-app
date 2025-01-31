"use client";

import React, { useState } from "react";
import Input from "@/components/Input";

const WishlistForm = ({ userId }: { userId: string }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    type: "Movie",
    language: "",
    year: "",
    comment: "",
  });

  const [status, setStatus] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Checking subscription status...");

    try {
      const response = await fetch("/api/check-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("You must be subscribed to submit this form!");
        setIsSubscribed(false); 
        return;
      }

      if (!data.isSubscribed) {
        setStatus("You must be subscribed to submit this form!");
        setIsSubscribed(false); 
        return; 
      }

      setIsSubscribed(true); 
      setStatus("Submitting...");

      const { email, name, type, language, year, comment } = formData;

      const formResponse = await fetch("/api/wishlist-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, type, language, year, comment }),
      });


      if (formResponse.ok) {
        setStatus("Thank you for your submission!");
      } else {
        setStatus("There was an issue with your submission. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Something went wrong. Please try again later.");
    }

    setFormData({
      email: "",
      name: "",
      type: "Movie",
      language: "",
      year: "",
      comment: "",
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 bg-background text-textCol">
      <h2 className="text-3xl font-bold text-center mb-6">Wishlist Form</h2>
      <p className="text-lg text-center mb-4">Only for the subscribed users</p>
      <h3 className="text-xl mb-8 text-center">
      Do you want to see your favorite movie, an upcoming release, or have any movie translated into your preferred language on our platform? Fill out the form, and we will reach out to you!      
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Movie Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Movie">Movie</option>
            <option value="TV series">TV series</option>
            <option value="Animation">Animation</option>
          </select>
        </div>
        <div>
          <Input
            type="text"
            id="language"
            name="language"
            placeholder="Enter Desired Language Translation"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Input
            type="text"
            id="year"
            name="year"
            placeholder="Enter Released Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            name="comment"
            id="comment"
            placeholder="Additional Comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Submit Form
        </button>
      </form>

      {status && (
        <p
          className={`mt-4 text-center text-lg ${
            !isSubscribed ? "text-red-500" : "text-green-500"
          }`}
        >
          {status}
        </p>
      )}
    </section>
  );
};

export default WishlistForm;