import React from "react";

interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  "data-cy"?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  placeholder,
  className,
  "data-cy": dataCy,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={className}
      data-cy={dataCy}
      required
    />
  );
};

export default Input;
