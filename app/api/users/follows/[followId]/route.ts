import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { followId: string } }
) {
  const session = await getServerSession();
  const userFollow = await prisma.user.findUnique({
    where: { id: params.followId },
  });
  if (session?.user?.email && userFollow) {
    const follows = await prisma.followers.findUnique({
      where: {
        userFollows_userEmail: {
          userFollows: userFollow.email,
          userEmail: session.user.email,
        },
      },
    });
    return NextResponse.json(follows);
  } else {
    return NextResponse.json("not-found", { status: 404 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { followId: string } }
) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json("you have to connected", { status: 404 });
  } else {
    const userSession = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const userFollow = await prisma.user.findUnique({
      where: { id: params.followId },
    });

    if (userSession && userFollow) {
      const follows = await prisma.followers.create({
        data: {
          userEmail: userSession.email,
          userFollows: userFollow.email,
        },
      });

      console.log("ici");

      return NextResponse.json(follows);
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { followId: string } }
) {
  const session = await getServerSession();
  const userFollow = await prisma.user.findUnique({
    where: { id: params.followId },
  });
  if (!session?.user?.email || !userFollow) {
    return NextResponse.json("you have to connected", { status: 404 });
  } else {
    const follows = await prisma.followers.findUnique({
      where: {
        userFollows_userEmail: {
          userEmail: session.user.email,
          userFollows: userFollow.email,
        },
      },
    });

    if (follows) {
      await prisma.followers.delete({
        where: {
          userFollows_userEmail: {
            userEmail: session.user.email,
            userFollows: userFollow.email,
          },
        },
      });

      return NextResponse.json("unfollow with succes");
    }
  }
}
