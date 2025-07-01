"use client";
import React, { useEffect, useState } from "react";
import {
  formatDate,
  sweetAlertDelete,
  sweetAlertAfterDelete,
} from "@/lib/util";
import { EditButton, DeleteButton } from "@/components/ui/ButtonContact";
import useSWR, { mutate } from "swr";

type Contact = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  updateAt: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ContactTable = () => {
  const { data, error, isLoading } = useSWR("/api/contact", fetcher);

  // tidak perlu message,contact atau useState lagi karena SWR sudah menangani fetch data,error,loading
  // const [message, setMessage] = useState("");
  // const [contacts, setContacts] = useState<Contact[]>([]);

  // tidak perlu useEffect karena sudah menggunakan SWR
  // useEffect(() => {

  //   const fetchDataContact = async () => {
  //     try {
  //       const res = await fetch("/api/contact");
  //       const json = await res.json();
  //       if (!res.ok) {
  //         setMessage(json.message || "Failed Get Data");
  //         return;
  //       }
  //       // console.log(json.contacts);
  //       setMessage(json.message || "");
  //       setContacts(json.contacts);
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //       setMessage("Gagal Terhubung dengan server");
  //     }
  //   };
  //   fetchDataContact();
  // }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Terjadi error saat mengambil data.</p>;

  const handleDelete = async (id: string) => {
    const contact = data?.contacts?.find((c: any) => c.id == id);
    const confirmed = await sweetAlertDelete(contact?.name);
    if (!confirmed) return;
    try {
      console.log("a");
      const res = await fetch(`api/contact/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message || "Gagal menghapus kontak");
        return;
      }

      sweetAlertAfterDelete();

      mutate("/api/contact");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus");
    }
  };
  return (
    <>
      {data.length === 0 ? (
        <h1 className="text-center text-red-500">{error}</h1>
      ) : (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6">Updated At</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.contacts?.map((contact: any, index: any) => (
              <tr key={contact.id} className="bg-white border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{contact.name}</td>
                <td className="py-3 px-6">{contact.phone}</td>
                <td className="py-3 px-6">
                  {formatDate(contact.createdAt.toString())}
                </td>
                <td className="py-3 px-6">
                  {formatDate(contact.updateAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <EditButton id={contact.id} />{" "}
                  <DeleteButton id={contact.id} onClick={handleDelete} />
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
