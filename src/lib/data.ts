/* eslint-disable @typescript-eslint/no-unused-vars */

import { prisma } from "@/lib/prisma";

export const getContacts = async () => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return contacts;
  } catch (error) {
    throw new Error("Failed to Fetch Contact Data");
  }
};
