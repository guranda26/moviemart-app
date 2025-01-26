"use client";

import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { FormElements } from "@/Interfaces/Forms";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ZodIssue } from "zod";

import { z } from "zod";

const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.union([
    z.number().min(14, "User should be at least 14 years old"),
    z.string().optional(),
  ]),
});

type FormData = z.infer<typeof userSchema>;

const ProfilePage = () => {
  const [profile, setProfile] = useState<FormData>({
    id: "",
    username: "",
    email: "",
    age: "",
  });
  const [initialProfile, setInitialProfile] = useState<FormData>({
    id: "",
    username: "",
    email: "",
    age: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormElements | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const profileImg = "/assets/user.png";

  useEffect(() => {
    fetch("/api/fetch-user")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProfile(data.profile);
          setInitialProfile(data.profile);
        }
      })
      .catch((error) => {
        const displayError =
          error.response?.data?.message || "Failed to fetch profile";
        setError(displayError);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "age") {
      setProfile((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isProfileChanged =
      JSON.stringify(profile) !== JSON.stringify(initialProfile);

    if (!isProfileChanged) {
      toast.info("No changes made to save.", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
      return;
    }

    setLoading(true);

    try {
      userSchema.parse(profile);
      setValidationErrors(null);

      const res = await fetch("/api/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Something went wrong, please try again.");
        toast.error(result.error || error, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      } else {
        toast.success(`${result.message || "Profile updated successfully"}`, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = Object.fromEntries(
          err.errors.map((curr: ZodIssue) => [curr.path[0], curr.message])
        );
        setValidationErrors(formattedErrors);
        toast.error("Validation failed. Please check your inputs.", {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      } else {
        setError("Failed to submit the form. Please try again.");
        toast.error(error, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!profile.id) return <Loading />;

  return (
    <section className="max-w-4xl mx-auto p-6 custom-gradient flex flex-col justify-evenly flex-1 w-3/4 lg:w-[40%] my-[60px] shadow-md">
      <div className="flex flex-col items-center justify-center gap-4 mb-6">
        <h2 className="text-2xl xs:text-3xl font-semibold text-white text-center">
          Edit Profile
        </h2>
        <Image
          width={100}
          height={100}
          alt="profile"
          src={profileImg}
          className="h-auto xs:w-[150px] xs:h-[150] sm:w-[200px] sm:h-[200]"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="px-6 rounded-lg space-y-4 flex flex-col gap-3"
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="text-white mb-2 font-medium">
            Username:
          </label>
          <Input
            type="text"
            name="username"
            id="username"
            className="p-3 border-2 rounded-lg bg-inputCol text-white focus:outline-none focus:ring-2 outline-none"
            value={profile.username}
            onChange={handleChange}
          />
          {validationErrors?.username && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.username}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-white mb-2 font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={profile.email}
            onChange={handleChange}
            className="p-3 border-2 rounded-lg bg-inputCol text-white focus:outline-none focus:ring-2 outline-none"
          />
          {validationErrors?.email && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.email}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="age" className="text-white mb-2 font-medium">
            Age:
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={profile.age}
            onChange={handleChange}
            className="p-3 border-2 rounded-lg bg-inputCol text-white focus:outline-none focus:ring-2 outline-none"
          />
          {validationErrors?.age && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.age}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-btnBg text-btnCol font-semibold rounded-lg shadow-lg hover:bg-hoverRedBtn hover:text-white transition mt-auto"
        >
          {loading ? "Submitting..." : "Save chnages"}
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default ProfilePage;
