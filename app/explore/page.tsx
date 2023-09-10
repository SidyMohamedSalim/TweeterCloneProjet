import { User2 } from "lucide-react";
import React from "react";
import prisma from "../../lib/prisma";
import FollowerBtn from "./FollowerBtn";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession();
  const users = await prisma.user.findMany({
    where: {
      email: {
        not: session?.user?.email ?? "",
      },
    },
  });

  return (
    <div>
      {users.map(async (user) => {
        const follow = await prisma.followers.findUnique({
          where: {
            userFollows_userEmail: {
              userFollows: user.email,
              userEmail: session?.user?.email ?? "",
            },
          },
        });

        return (
          <div
            key={user.id}
            className="max-w-lg min-w-[24rem] mr-4 my-2 p-3 text-sm font-semibold rounded-lg  flex justify-between items-center "
          >
            <Link
              href={`/profile/${user.email}`}
              className="flex justify-evenly items-start gap-4"
            >
              <div className=" bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center">
                <User2 size={20} />
              </div>
              <div>
                <h2 className="text-sm font-extrabold">{user.name}</h2>
                <p className="text-sm opacity-50">{user.email}</p>
              </div>
            </Link>
            <FollowerBtn isFollow={follow ? true : false} userId={user.id} />
          </div>
        );
      })}
    </div>
  );
};

export default page;
