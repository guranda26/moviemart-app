import { InputProps } from "@/Interfaces/InputProps";
import React from "react";

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  placeholder,
  min,
  value,
  className,
  "data-cy": dataCy,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      min={min}
      className={className}
      data-cy={dataCy}
      onChange={onChange}
      required
    />
  );
};

export default Input;
