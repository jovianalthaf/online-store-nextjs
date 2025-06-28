"use client"; // ⬅️ WAJIB untuk interaktifitas

import Button from "@/components/ui/Button";

// app/login/page.tsx
export default function LoginPage() {
  const handleClick = () => {
    alert("test");
  };
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Login ke Akun Anda
      </h1>
      <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="contoh@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <Button variant="primary" onClick={handleClick}>
          Login
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Belum punya akun?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Daftar di sini
        </a>
      </p>
    </div>
  );
}
