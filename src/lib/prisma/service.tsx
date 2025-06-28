import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type UserData = {
  email: string;
  password: string;
  name: string;
};
export async function signUp(userData: UserData) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      return "Email Sudah Terdaftar";
    }

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error saat signup:", error);
    return "Terjadi kesalahan server";
  }
}
