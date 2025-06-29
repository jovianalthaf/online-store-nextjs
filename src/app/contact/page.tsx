import React from "react";
import ContactTable from "@/components/ui/contact-table";
import Search from "@/components/ui/search";
import { CreateButton } from "@/components/ui/ButtonContact";
const Contact = () => {
  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>

      <ContactTable />
    </div>
  );
};

export default Contact;
