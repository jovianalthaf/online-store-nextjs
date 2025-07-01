import { z } from "zod";
import Swal from "sweetalert2";

export const sweetAlertDelete = async (item: string) => {
  console.log("tunggu user jawaban");
  const result = await Swal.fire({
    title: `Are you sure delete Contact : ${item}?`,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  return result.isConfirmed;
};

export const sweetAlertAfterDelete = async () => {
  return await Swal.fire({
    title: "Deleted!",
    text: "Your contact has been deleted.",
    icon: "success",
  });
};
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return formatter.format(date);
};

export const headers = (customHeaders = {}) => {
  return {
    "Content-Type": "application/json",
    ...customHeaders,
  };
};

export const ContactSchema = z.object({
  name: z
    .string()
    .refine((val) => val.length > 0, { message: "Name wajib diisi" })
    .refine((val) => val.length >= 6, { message: "Name minimal 6 karakter" }),
  phone: z
    .string()
    .min(1, "Phone wajib diisi")
    .min(1, "Phone minimal 11 karakter"),
});
