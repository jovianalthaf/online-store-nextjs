import UpdateForm from "@/components/ui/edit-form";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
const UpdateContactPage = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <UpdateForm id={id} />
    </div>
  );
};

export default UpdateContactPage;
