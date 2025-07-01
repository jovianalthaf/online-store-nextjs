"use client";

import Input from "./Input";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅
import { headers } from "@/lib/util";
import { SubmitButton } from "@/components/ui/ButtonContact";
import useSWR, { mutate } from "swr";

const UpdateForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string[]; phone?: string[] }>(
    {}
  );
  const fetchContact = async () => {
    try {
      const res = await fetch(`/api/contact/${id}`);
      const json = await res.json();
      console.log(json);
      if (!res.ok) {
        setMessage(json.message || "Gagal mengambil data");
        return;
      }

      mutate("/api/contact");
      const contactData = json.data;
      setContact({
        name: contactData.name ?? "",
        phone: contactData.phone ?? "",
      });
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Gagal Terhubung dengan server");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/contact/${id}`, {
      method: "PUT",
      body: JSON.stringify(contact),
      headers: headers(),
    });
    // console.log(res);
    const data = await res.json();
    if (res.ok) {
      setMessage(data.message || "Berhasil Update Data Contact");
      setIsError(false);
      return;
    } else {
      setMessage(data.message || "Gagal Update Data Contact");
      setIsError(true);
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setErrors({});
      }
    }

    // console.log("Berhasil Update");
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white-900"
          >
            Full Name
          </label>
          <Input
            placeholder="John Doe"
            name="name"
            value={contact.name}
            onChange={(e) =>
              setContact({
                ...contact,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
          )}{" "}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-white-900"
          >
            Phone
          </label>
          <Input
            placeholder="123456"
            name="phone"
            value={contact.phone}
            id="phone"
            onChange={(e) =>
              setContact({
                ...contact,
                [e.target.name]: e.target.value,
              })
            }
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone[0]}</p>
            )}{" "}
          </div>
        </div>

        {message && (
          <p
            className={`mt-3 text-sm ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <SubmitButton label="update" loading={loading} />
      </form>
    </div>
  );
};

export default UpdateForm;
