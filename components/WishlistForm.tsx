"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import Link from "next/link";
import useLocaleFromPath from "@/components/UsePath";

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
  comment: z.string().max(500, "Comment must be 500 characters or less.").optional(),
  comment_ka: z.string().max(500, "Comment must be 500 characters or less.").optional(),
  image_src: z.string().optional(),
});

const WishlistForm = ({ userId }: { userId: string }) => {
  const locale = useLocaleFromPath();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    type: "Movie",
    language: "",
    year: "",
    comment: "",
    comment_ka: "",
    image_src: "",
  });

  const [status, setStatus] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({}); 
  const [showStatus, setShowStatus] = useState(true)
  const {t} = useTranslation()

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

      const { email, name, type, language, year, comment, comment_ka, image_src } = formData;

      const formResponse = await fetch("/api/wishlist-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, type, language, year, comment, comment_ka, image_src }),
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
      comment_ka: "",
      image_src: "",
    });
  };


  return (
    <section className="max-w-4xl mx-auto px-6 py-12 bg-background text-textCol">
      <h2 className="text-3xl font-bold text-center mb-6">{t("wishlist:form_txt")}</h2>
      <p className="text-lg text-center mb-4">{t("wishlist:form_restriction")}</p>
      <h3 className="text-xl mb-4 text-center">
        {t("wishlist:form_request")}
      </h3>
      <p className="text-md text-center mb-6">{t("wishlist:check_txt")}&nbsp;<Link href={'/wishlist'} className="text-blue-700 hover:underline">{t("wishlist:check_link")}</Link></p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder={t("common_placeholder:enter_email")}
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
            placeholder={t("common_placeholder:enter_email")}
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
            <option value="Movie">{t("wishlist:type_movie")}</option>
            <option value="TV series">{t("wishlist:type_series")}</option>
            <option value="Animation">{t("wishlist:type_animation")}</option>
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
            <option value="">{t("wishlist:select_lang")}</option>
            <option value="Georgian">{t("wishlist:lang_geo")}</option>
            <option value="English">{t("wishlist:lang_en")}</option>
            <option value="Russian">{t("wishlist:lang_rus")}</option>
            <option value="Spanish">{t("wishlist:lang_sp")}</option>
            <option value="German">{t("wishlist:lang_ger")}</option>
          </select>
          {formErrors.language && <p className="text-red-500">{formErrors.language}</p>}
        </div>
        <div>
          <Input
            type="text"
            id="year"
            name="year"
            placeholder={t("common_placeholder:enter_released_year")}
            value={formData.year}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.year && <p className="text-red-500">{formErrors.year}</p>}
        </div>
        <div><Input
            type="text"
            id="image_src"
            name="image_src"
            placeholder={t("common_placeholder:enter_url")}
            value={formData.image_src}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.image_src && <p className="text-red-500">{formErrors.image_src}</p>}</div>
        <div>
          <textarea
            name={locale === 'ka' ? 'comment_ka' : 'comment'}
            id="comment"
            placeholder="Additional Comment (Optional)"
            value={locale === 'ka' ? formData.comment_ka : formData.comment}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {formErrors.comment && <p className="text-red-500">{formErrors.comment}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-redButton text-white rounded-md hover:bg-hoverRedBtn transition"
        >
          {t("common_placeholder:submit")}
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
