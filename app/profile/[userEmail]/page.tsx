import { getServerSession } from "next-auth";
import React from "react";
import prisma from "@/lib/prisma";
import { User2 } from "lucide-react";
import Btn from "@/components/Btn";
import TweetCard from "@/components/TweetCard";
import { getTweetsByEmail, getUser } from "src/server/tweet";
import {
  getfollowings,
  getfollowers,
  calculFollows,
} from "../../../src/server/tweet";

const page = async ({ params }: { params: { userEmail: string } }) => {
  const email = decodeURIComponent(params.userEmail);
  const user = await getUser(email);
  const myTweets = await getTweetsByEmail(email);
  const followings = await getfollowings(email);

  const followers = await getfollowers(email);

  const nbrefollowings = calculFollows(followings);
  const nbrefollowers = calculFollows(followers);
  return (
    <div
      data-te-perfect-scrollbar-init
      data-te-suppress-scroll-x="true"
      className="px-6 col-span-5 max-md:col-span-8  overflow-y-scroll h-screen my-2 p-3 text-sm font-semibold border-gray-700 rounded-lg border "
    >
      <div className="w-full h-52 bg-gray-900 relative mb-10">
        <div className="flex absolute w-full px-3 -bottom-7 justify-between items-center">
          <div className="flex gap-2 justify-evenly items-end">
            <div className="bg-gray-600 shadow-xl w-16 h-16 rounded-full flex items-center justify-center">
              <User2 size={25} />
            </div>
            <h1 className="font-extrabold pb-2 flex flex-col">
              {user?.name}
              <span className="text-gray-500 text-xs">{user?.email}</span>
            </h1>
          </div>
          <div className="max-sm:hidden">
            {" "}
            <Btn type="secondary" text="Profil"></Btn>
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-3">
        <p className="text-gray-600 text-sm">
          <span className="font-extrabold text-white mr-2">
            {nbrefollowings}
          </span>{" "}
          Abonnements
        </p>
        <p className="text-gray-600 text-sm">
          <span className="font-extrabold text-white mr-2">
            {nbrefollowers}
          </span>{" "}
          Abonné(e)s
        </p>
      </div>
      <div className="py-5">
        <h1 className="font-extrabold mb-2 text-2xl">Tweets</h1>
        {myTweets &&
          myTweets.map((tweet) => <TweetCard tweet={tweet} key={tweet.id} />)}
      </div>
    </div>
  );
};

export default page;
