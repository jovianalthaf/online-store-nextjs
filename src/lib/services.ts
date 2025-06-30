/* eslint-disable @typescript-eslint/no-unused-vars */

"use server";

export const saveContact = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
};
