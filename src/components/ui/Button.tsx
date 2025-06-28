import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseClass =
    "w-full py-2 px-4 rounded-md transition font-medium text-sm focus:outline-none focus:ring-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400",
  };

  // Gabungkan semua class dalam 1 string manual
  const combinedClass = `${baseClass} ${variants[variant]} ${className}`;

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
