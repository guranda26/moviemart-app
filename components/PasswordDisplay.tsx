"use client";

import Image from "next/image";
import React, { useState } from "react";
import Input from "./Input";

interface PasswordProps {
  leftPadding?: string;
  showIcon?: boolean;
}

const PasswordDisplay: React.FC<PasswordProps> = ({
  leftPadding,
  showIcon = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const closedEye = "/assets/closed-eye.svg";
  const eye = "/assets/eye.svg";
  const keyIcon = "/assets/key.svg";

  const handlePasswordDisplay = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      suppressHydrationWarning={true}
      className="relative w-[100%] bg-[#363636] mx-auto p-3 mb-4 border rounded border-white sm:text-sm md:text-base text-white"
    >
      <Input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        data-cy="password-input"
        placeholder="Passwoerd"
        className={`bg-[#363636] outline-none pl-${leftPadding} w-[100%] text-sm`}
      />
      <Image
        src={!showPassword ? closedEye : eye}
        alt="eye-icon"
        width={16}
        height={16}
        className="absolute top-[8px] right-1 translate-y-[50%] hover:cursor-pointer"
        onClick={handlePasswordDisplay}
      />
      <Image
        src={keyIcon}
        alt="key-icon"
        width={16}
        height={16}
        className={`absolute top-[8px] left-1.5 translate-y-[50%] ${showIcon ? "initial" : "hidden"}`}
      />
    </div>
  );
};

export default PasswordDisplay;
