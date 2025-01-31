"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

const wishlistFormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
  name: z.string().nonempty("Movie name is required."),
  type: z.enum(["Movie", "TV series", "Animation"], {
    errorMap: () => ({ message: "Please select a valid movie type." }),
  }),
  language: z.enum(["Georgian", "English", "Russian", "Spanish", "German"], {
    errorMap: () => ({ message: "Please select a valid language." }),
  }),
  year: z
    .string()
    .regex(/^\d{4}$/, "Please enter a valid year (e.g., 2023).")
    .nonempty("Year is required.")
    .refine((year) => {
      const yearNumber = parseInt(year, 10);
      return yearNumber >= 1900 && yearNumber <= 2026;
    }, "Year must be between 1900 and 2026."),
  comment: z.string().optional(),
});

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
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({}); 
  const [showStatus, setShowStatus] = useState(true)

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


    try {
      wishlistFormSchema.parse(formData);
      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.formErrors.fieldErrors);
        return; 
      }
    }

    setStatus("Checking subscription status...");
    setShowStatus(true);

    try {
      const response = await fetch("/api/check-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok || !data.isSubscribed) {
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
        const successMsg = "Thank you for your submission!"
        setStatus(successMsg);
        toast.success(successMsg)
      } else {
        const errorMsg = "There was an issue with your submission. Please try again."
        setStatus(errorMsg);
        toast.error(errorMsg)
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = "Something went wrong. Please try again later."
      setStatus(errorMsg);
      toast.error(errorMsg)
    }

    setTimeout(() => {
      setShowStatus(false);
    }, 5000);

    
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
          {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
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
          {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
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
          {formErrors.type && <p className="text-red-500">{formErrors.type}</p>}
        </div>
        <div>
          <select
            name="language"
            id="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Language</option>
            <option value="Georgian">Georgian</option>
            <option value="English">English</option>
            <option value="Russian">Russian</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
          </select>
          {formErrors.language && <p className="text-red-500">{formErrors.language}</p>}
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
          {formErrors.year && <p className="text-red-500">{formErrors.year}</p>}
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
          {formErrors.comment && <p className="text-red-500">{formErrors.comment}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-redButton text-white rounded-md hover:bg-hoverRedBtn transition"
        >
          Submit Form
        </button>
      </form>

      {showStatus && (
       <>
        <p
          className={`mt-4 text-center text-lg ${
            !isSubscribed ? "text-red-500" : "text-green-500"
          }`}
        >
          {status}
        </p>
        <ToastContainer />  
        </>
      )}
    </section>
  );
};

export default WishlistForm;
