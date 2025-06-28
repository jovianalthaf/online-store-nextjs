// app/login/layout.tsx
import React from "react";

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  // app/login/layout.tsx
  return (
    <div className="flex justify-center items-center h-screen bg-black border-amber-50">
      {children}
    </div>
  );
};

export default RegisterLayout;
