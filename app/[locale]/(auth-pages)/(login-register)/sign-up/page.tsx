"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import PasswordDisplay from "@/components/PasswordDisplay";
import TextDivider from "@/components/TextDivider";
import { signUpAction } from "@/actions";
import OAuthProviders from "@/components/auth/OAuthProviders";
import CustomMsg from "@/components/CustomMsg";
import { z } from "zod";
import Loading from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { FormElements } from "@/Interfaces/Forms";

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,20}$"
);

const userSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.union([
    z.number().min(14, "User should be at least 14 years old"),
    z.string().optional(),
  ]),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

type FormData = z.infer<typeof userSchema>;

interface Message {
  type: "error" | "success";
  content: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

interface RegisterProps {
  searchParams: Promise<Message>;
}

const Register: React.FC<RegisterProps> = ({ searchParams }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    age: "",
    password: "",
  });
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<FormElements>({});

  const { t } = useTranslation();

  useEffect(() => {
    const fetchParams = async () => {
      const params = await searchParams;
      if (params.type === "error") {
        setMessage({ type: "error", content: params.content });
      }
      setLoading(false);
    };
    fetchParams();
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "age") {
      setFormData({
        ...formData,
        [name]: value === "" ? "" : Number(value),
      });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});
    const validation = userSchema.safeParse(formData);
    if (!validation.success) {
      const newErrors = validation.error.issues.reduce(
        (acc: FormElements, issue) => {
          const key = issue.path[0];
          if (typeof key === "string") {
            acc[key as keyof FormElements] = issue.message;
          }
          return acc;
        },
        {} as FormElements
      );
      setErrors(newErrors);
      return;
    }

    const response: ApiResponse | string = await signUpAction(
      new FormData(event.target)
    );

    if (typeof response === "string") {
      setMessage({ type: "error", content: response });
    } else if (!response.success) {
      setMessage({ type: "error", content: response.message });
      setFormData({ username: "", email: "", age: "", password: "" });
    } else if (response.success) {
      setMessage({ type: "success", content: response.message });
      setFormData({ username: "", email: "", age: "", password: "" });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h2 className="xs:text-2xl text-xl font-semibold text-[#e3e2e2]">
        {t("auth:sign_up_heading")}
      </h2>
      <p className="text-[#c6c6c6] text-sm mb-4 mt-1 font-semibold">
        {t("auth:sign_up_paragraph")}
      </p>
      <form className="flex flex-col gap-4 pt-6 pb-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder={t("common:username")}
          value={formData.username}
          onChange={handleChange}
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white outline-none"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
        <Input
          type="email"
          name="email"
          id="email"
          placeholder={t("common:email")}
          value={formData.email}
          onChange={handleChange}
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white outline-none"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <Input
          type="number"
          name="age"
          id="age"
          min="14"
          placeholder={t("common:age")}
          value={formData.age}
          onChange={handleChange}
          className="relative w-[100%] bg-[#363636] mx-auto p-3 border rounded border-white sm:text-sm md:text-base text-white outline-none"
        />
        {errors.age && <p className="text-red-500">{errors.age}</p>}
        <PasswordDisplay
          showIcon={false}
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        <button
          type="submit"
          className="xs:w-[100%] py-3 rounded-md bg-purpleButton hover:bg-hoverPurpleBtn text-white text-md font-bold"
        >
          {t("auth:sign_up")}
        </button>
      </form>
      <TextDivider />
      <OAuthProviders />
      <p className="text-xs text-wrap sm:text-sm flex flex-wrap justify-center md:textmd text-white text-center mt-2">
        <span>{t("auth:sign_up")}&nbsp;</span>
        <Link className="font-medium underline text-white" href="/sign-in">
          {t("auth:login")}
        </Link>
      </p>
      {message && <CustomMsg action={message?.type} msg={message?.content} />}
    </>
  );
};

export default Register;
