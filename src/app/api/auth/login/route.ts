import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  //   push prism
  //   login with prisma
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Login gagal" }, { status: 401 });
  }

  return NextResponse.json(
    { message: "Login Berhasil", user },
    { status: 200 }
  );
}
