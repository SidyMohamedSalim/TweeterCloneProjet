import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

const bodyScheme = z.object({
  content: z.string(),
  tweetParentId: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  const bodyParse = bodyScheme.parse(body);
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "User not Connetecd" }, { status: 400 });
  } else {
    const tweet = await prisma.tweet.create({
      data: {
        content: bodyParse.content,
        tweetParentId: bodyParse.tweetParentId,
        userEmail: session.user.email,
      },
    });
    return NextResponse.json(tweet);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { tweetId: string } }
) {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: params.tweetId,
    },
  });
  return NextResponse.json(tweet);
}
