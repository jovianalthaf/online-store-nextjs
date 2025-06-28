import React from "react";

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div>
      <label
        className={`block text-sm font-medium text-gray-700 ${className}`}
        {...props}
      >
        {children}
      </label>
    </div>
  );
};

export default Label;
