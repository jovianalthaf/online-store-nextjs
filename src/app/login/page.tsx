"use client"; // ⬅️ WAJIB untuk interaktifitas

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useState } from "react";

// app/login/page.tsx
export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json(); // ⚠️ response sebenarnya HTML, bukan JSON
    if (!res.ok) {
      const text = await res.text(); // Coba lihat isinya kalau bukan JSON
      console.error("Error response:", text);
      return;
    }
    if (res.ok) {
      alert("Login Berhasil");
    } else {
      alert(data.error || "Login gagal");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Login ke Akun Anda
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          {/* label component  */}
          <Label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="youremail@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button variant="primary">Login</Button>
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
