/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
const ContactSchema = z.object({
  name: z
    .string()
    .refine((val) => val.length > 0, { message: "Name wajib diisi" })
    .refine((val) => val.length >= 6, { message: "Name minimal 6 karakter" }),
  phone: z
    .string()
    .min(1, "Phone wajib diisi")
    .min(1, "Phone minimal 11 karakter"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // validasi dengan zod
    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      console.log(errors);
      if (
        errors.name?.includes("Name wajib diisi") &&
        errors.phone?.includes("Phone wajib diisi")
      ) {
        return NextResponse.json(
          { message: "Name dan Phone Wajib di isi" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Ada Kesalahan", errors },
        { status: 400 }
      );
    }
    const { name, phone } = body;

    //   insert or create contact
    const contact = await prisma.contact.create({
      data: {
        name,
        phone,
      },
      select: {
        name: true,
        phone: true,
      },
    });

    return NextResponse.json(
      { message: "Create Contact Success", contact },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      error: "Failed to create contact",
      status: 500,
    });
  }
}
