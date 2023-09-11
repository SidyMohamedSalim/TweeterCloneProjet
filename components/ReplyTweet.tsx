import React from "react";
import { BarChart2, MessageCircle, Repeat2, Share, User2 } from "lucide-react";
import { ActionIcon } from "./TweetCard";

import { TweetLikes } from "./TweetLike";
import { Tweet } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { formatDate } from "../src/config/formatDate";

const ReplyTweetView = async ({ tweet }: { tweet: Tweet }) => {
  const session = await getServerSession();
  const user = await prisma?.user.findUnique({
    where: {
      email: tweet.userEmail,
    },
  });

  const tweetlike = await prisma?.tweetLike.findUnique({
    where: {
      userEmail_TweetId: {
        userEmail: session?.user?.email ?? "",
        TweetId: tweet.id,
      },
    },
  });

  const allLikes = await prisma?.tweetLike.findMany({
    where: {
      TweetId: tweet.id,
    },
  });
  const allRelplies = await prisma?.tweet.findMany({
    where: {
      tweetParentId: tweet.id,
    },
  });

  const nbreReplies = allRelplies?.length ?? 0;
  const nbreLikes = allLikes?.length ?? 0;

  return (
    <div className="border-b-2 mb-2  border-gray-700 py-5">
      <Link
        href={`/tweets/${tweet.id}`}
        className="flex justify-between items-start"
      >
        <div className="flex justify-start items-start gap-2">
          <div className=" bg-gray-800 flex-none w-10 h-10 rounded-lg flex items-center justify-center">
            <User2 size={20} />
          </div>
          <div className="font-medium">
            <h3>
              {user?.name}
              <span className="text-sm italic mx-2 opacity-50 ">
                {user?.email}
              </span>
            </h3>
            <p>{tweet.content}</p>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          {formatDate(new Date(tweet.created_at))}
        </p>
      </Link>
      {/* actions bloc */}
      <div className="pl-14 flex justify-between items-center">
        <ActionIcon nbr={nbreReplies} Icon={MessageCircle} />
        <ActionIcon nbr={510} Icon={Repeat2} />
        <TweetLikes
          id={tweet.id}
          islike={tweetlike?.isLike ? true : false}
          countLike={nbreLikes}
        />
        <ActionIcon nbr={120} Icon={BarChart2} />

        <div className="pt-3">
          <Share color="gray" size={18} />
        </div>
      </div>
    </div>
  );
};

export default ReplyTweetView;
