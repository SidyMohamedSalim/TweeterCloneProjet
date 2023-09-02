import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(
  req: Request,
  { params }: { params: { tweetId: string } }
) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "User not Connetecd" }, { status: 400 });
  } else {
    const tweetLike = await prisma.tweetLike.create({
      data: {
        TweetId: params.tweetId,
        userEmail: session.user.email,
      },
    });
    return NextResponse.json(tweetLike);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { tweetId: string } }
) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "User not Connetecd" }, { status: 400 });
  } else {
    const tweetLike = await prisma.tweetLike.findUnique({
      where: {
        userEmail_TweetId: {
          userEmail: session.user.email,
          TweetId: params.tweetId,
        },
      },
    });
    if (tweetLike) {
      const tweetUpdateLike = await prisma.tweetLike.delete({
        where: {
          userEmail_TweetId: {
            userEmail: session.user.email,
            TweetId: params.tweetId,
          },
        },
      });
      return NextResponse.json({ tweet: tweetUpdateLike });
    }

    return NextResponse.json({ Error: "Something is wrong" }, { status: 404 });
  }
}
