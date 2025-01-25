"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../Input";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";
import { resetPasswordAction } from "@/actions";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 char")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase and one letter"
      )
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ValidatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const validationResult = passwordSchema.safeParse({
      password,
      confirmPassword,
    });

    // Update error state based on validation
    if (!validationResult.success) {
      const messages = validationResult.error.issues
        .map((issue) => issue.message)
        .join(", ");
      setPasswordError(messages);
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleFormAction = async (formData: FormData): Promise<void> => {
    await resetPasswordAction(formData);
  };

  function ResetErrors() {
    const validationResult = passwordSchema.safeParse({
      password,
      confirmPassword,
    });

    if (validationResult.success) {
      setPasswordError("");
    }
  }

  return (
    <>
      <Input
        type="password"
        name="password"
        id="password"
        onChange={handleInputChange}
        value={password}
        placeholder="New password"
        className="relative w-full bg-[#363636] p-3 border rounded border-white mb-2"
      />
      <Input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        onChange={handleInputChange}
        value={confirmPassword}
        placeholder="Confirm password"
        className="relative w-full bg-[#363636] p-3 border rounded border-white mb-2"
      />
      <button
        type="submit"
        // disabled={
        //   !passwordSchema.safeParse({ password, confirmPassword }).success
        // }
        onClick={ResetErrors}
        formAction={handleFormAction}
        className="w-full py-3 rounded-md bg-purple bg-purpleButton hover:bg-hoverPurpleBtn text-white font-bold mb-2"
      >
        Reset password
      </button>

      {passwordError && (
        <div className="text-red-500 text-sm">{passwordError}</div>
      )}
    </>
  );
};

export default ValidatePassword;
