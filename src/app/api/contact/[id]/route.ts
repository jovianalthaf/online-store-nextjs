import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ContactSchema } from "@/lib/util";
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await req.json();
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

  const updateContact = await prisma.contact.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      phone: phone,
      updateAt: new Date(),
    },
  });

  return NextResponse.json(
    { message: "Update Contact Success", updateContact },
    { status: 201 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const deleteContact = await prisma.contact.delete({
      where: { id },
    });

    if (!deleteContact) {
      return NextResponse.json(
        { message: "Contact Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Contact Delete Success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Contact Error:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan di server" },
      { status: 500 }
    );
  }
}
