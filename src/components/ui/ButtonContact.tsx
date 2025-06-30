"use client";

import Link from "next/link";
import { IoAddSharp, IoPencil, IoTrashOutline } from "react-icons/io5";
import clsx from "clsx";
export const CreateButton = () => {
  return (
    <Link
      href="/contact/create"
      className="inline-flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 px-5 py-[9px] rounded-sm text-sm"
    >
      <IoAddSharp size={20} />
      Create
    </Link>
  );
};

export const EditButton = () => {
  return (
    <Link
      href="/contacts/create"
      className="rounded-sm border p-1 hover:bg-gray-100"
    >
      <IoPencil size={20} />
    </Link>
  );
};

export const DeleteButton = () => {
  return (
    <Link
      href="/contacts/create"
      className="rounded-sm border p-1 hover:bg-gray-100"
    >
      <IoTrashOutline size={20} />
    </Link>
  );
};

export const SubmitButton = ({
  label,
  loading,
}: {
  label: string;
  loading: boolean;
}) => {
  const className = clsx(
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center",
    {
      "opacity-50 cursor-progress": loading,
    }
  );
  return (
    <button type="submit" className={className} disabled={loading}>
      {label === "save" ? (
        <span>{loading ? "Saving..." : "Save"}</span>
      ) : (
        <span>{loading ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};
