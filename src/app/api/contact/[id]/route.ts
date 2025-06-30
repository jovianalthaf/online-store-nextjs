import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const contact = await prisma.contact.findUnique({
      where: { id },
      select: { id: true, name: true, phone: true },
    });

    if (!contact) {
      return NextResponse.json(
        { message: "Contact tidak ditemukan" },
        { status: 404 }
      );
    }
    // console.log(NextResponse.json(contact));
    return NextResponse.json({ data: contact }, { status: 200 });
  } catch (error) {
    console.error("GET Contact Error:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan di server" },
      { status: 500 }
    );
  }
}
