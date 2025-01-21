import React from "react";

interface InputProps {
  type: string;
  name: string;
  id: string;
  min?: string;
  placeholder?: string;
  value?: string | number;
  "data-cy"?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
      min={value}
      className={className}
      data-cy={dataCy}
      onChange={onChange}
      required
    />
  );
};

export default Input;
