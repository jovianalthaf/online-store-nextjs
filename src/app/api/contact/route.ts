/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContactSchema } from "@/lib/util";

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
        { message: "Validation Failed", errors },
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
    console.log(`Post Data Contact Error : ${error}`);
    return NextResponse.json(
      { message: "Terjadi kesalahan di server" },
      { status: 500 }
    );
  }
}

export const GET = async () => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (contacts.length === 0) {
      return NextResponse.json({ message: "No Contact Data" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "All Contact Data", contacts },
      { status: 200 }
    );
  } catch (error) {
    throw new Error("Failed to Fetch Contact Data");
  }
};
