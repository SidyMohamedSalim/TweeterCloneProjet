import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession();

  if (session?.user?.email) {
    const follows = await prisma.followers.findMany({
      where: {
        userEmail: session.user.email,
      },
    });
    return NextResponse.json(follows);
  }
}
