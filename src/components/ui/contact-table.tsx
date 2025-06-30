"use client";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/lib/util";
import { EditButton, DeleteButton } from "@/components/ui/ButtonContact";

type Contact = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  updateAt: string;
};
const ContactTable = () => {
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
    const fetchDataContact = async () => {
      try {
        const res = await fetch("/api/contact");
        const json = await res.json();
        if (!res.ok) {
          setMessage(json.message || "Failed Get Data");
          return;
        }
        // console.log(json.contacts);
        setMessage(json.message || "");
        setContacts(json.contacts);
      } catch (error) {
        console.error("Fetch error:", error);
        setMessage("Gagal Terhubung dengan server");
      }
    };
    fetchDataContact();
  }, []);
  return (
    <>
      {contacts.length === 0 ? (
        <h1 className="text-center text-red-500">{message}</h1>
      ) : (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id} className="bg-white border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{contact.name}</td>
                <td className="py-3 px-6">{contact.phone}</td>
                <td className="py-3 px-6">
                  {formatDate(contact.createdAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <EditButton id={contact.id} /> <DeleteButton />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ContactTable;
