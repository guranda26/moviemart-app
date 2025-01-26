"use client";

import Input from "@/components/Input";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "emailjs-com";
import { z } from "zod";
import { useTranslation } from "react-i18next";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name should be at least 2 characters long.")
    .max(140, "Too long!"),
  email: z.string().email("Invalid email format.").max(140, "Too long!"),
  subject: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long.")
    .max(280, "Too long!"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type ErrorState = Partial<Record<keyof ContactFormData | "form", string>>;

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: ErrorState = {};
      validation.error.errors.forEach((error) => {
        const key = error.path[0] as keyof ErrorState;
        if (key) {
          fieldErrors[key] = error.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
      return;
    }

    const service_id = process.env.NEXT_PUBLIC_SERVICE_ID;
    const template_id = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const emailjs_public_key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!service_id || !template_id || !emailjs_public_key) {
      throw new Error("Missing environment variables for EmailJS");
    }

    try {
      await emailjs.send(
        service_id,
        template_id,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "No Subject",
          message: formData.message,
        },
        emailjs_public_key
      );

      setSuccessMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (error) {
      setErrors({ form: "Something went worng. Please try again later." });
      toast.error("Something went worng. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
      console.error(error);
    }
  };

  return (
    <section className="flex-1 flex flex-col justify-evenly mx-auto xs:p-6 py-6 px-2 max-w-screen w-screen text-textCol relative">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-4 xs:text-2xl">
          {" "}
          {t("contact:welcome_msg")}! 👋
        </h2>
        <p className="mb-2 xs:text-xl font-semibold">
          {t("contact:welcome_first_text")} 🎥🍿
        </p>
        <p className="xs:text-xl font-semibold">
          {t("contact:welcome_second_text")} 🚀
        </p>
      </div>

      <div className="text-center">
        <h4 className="text-lg xs:text-2xl font-bold mb-4">
          {t("contact:contact_us")}
        </h4>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-profileBg shadow-md rounded-lg xs:p-6 p-3 mx-auto text-white"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              {t("contact:name")}
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-inputCol"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              {t("contact:email")}
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-inputCol"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="subject">
              {t("contact:subject")}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-inputCol"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="message">
              {t("contact:message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-inputCol"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          {errors.form && (
            <p className="text-red-500 text-sm mb-4">{errors.form}</p>
          )}
          <button
            type="submit"
            className="w-full bg-btnBg text-btnCol font-medium py-2 rounded-md hover:bg-hoverRedBtn"
          >
            {t("contact:contact_btn")}
          </button>
        </form>
        <p className="my-4 xs:text-xl">{t("contact:form_description")}</p>
        <p className="my-4 xs:text-xl">{t("contact:description_msg")}</p>
      </div>
      <div className="my-8 text-center break-all">
        <ul className="list-none space-y-2">
          <li>📍 {t("contact:address")}</li>
          <li>📞 {t("contact:phone")} +1 (123) 456-7890</li>
          <li>📧 {t("contact:email_static")} contact@moviestream.com</li>
        </ul>
      </div>
      <ToastContainer className={"absolute top-10"} />
    </section>
  );
};

export default Contact;
