import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const tweets = await prisma.tweet.findMany();
  return NextResponse.json(JSON.stringify(tweets));
}
