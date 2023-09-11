import React from "react";
import prisma from "@/lib/prisma";
import TweetCard from "@/components/TweetCard";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import {
  BarChart2,
  BarChart3,
  MessageCircle,
  Repeat2,
  Share,
  User2,
} from "lucide-react";
import { ActionIcon } from "../../../components/TweetCard";
import { TweetLikes } from "../../../components/TweetLike";
import Image from "next/image";
import { SendHorizonal } from "lucide-react";

import ReplyTweetForm from "../../../components/ReplyTweetForm";
import ReplyTweetView from "@/components/ReplyTweet";
import AvatarA from "@/components/AvatarA";
import { formatDate } from "../../../src/config/formatDate";
import {
  getnbreReplies,
  getnbreLikes,
  getUser,
} from "../../../src/server/tweet";
import {
  getOnetweet,
  gettweetsReplies,
  gettweetlike,
  getallRelplies,
} from "../../../src/server/tweet";

const page = async ({ params }: { params: { tweetId: string } }) => {
  const iconSize = 20;

  const tweet = await getOnetweet(params.tweetId);

  if (!tweet) {
    return <div>Not Found</div>;
  }
  const session = await getServerSession();

  const tweetsReplies = await gettweetsReplies(tweet.id);

  const tweetlike = await gettweetlike(session?.user?.email ?? "", tweet.id);

  const allLikes = await prisma?.tweetLike.findMany({
    where: {
      TweetId: tweet.id,
    },
  });

  const allRelplies = await getallRelplies(tweet.id);

  const nbreReplies = getnbreReplies(allRelplies);
  const nbreLikes = getnbreLikes(allLikes);
  const user = await getUser(tweet.userEmail);

  return (
    <section className="mr-4 my-2 p-3 text-sm font-semibold border-gray-700 rounded-lg border ">
      {/* user information bloc */}
      <div className="flex justify-between items-start">
        <AvatarA email={user?.email} name={user?.name} isLink={true} />
        <p className="text-xs text-gray-500">
          {formatDate(new Date(tweet.created_at))}
        </p>
      </div>

      {/* image  bloc */}
      <div className="py-4 w-full">
        <p className="my-4">{tweet.content}</p>
        {/* <Image
          className="w-full border border-gray-600 rounded-lg hover:opacity-50 cursor-pointer"
          src={"/pub.jpg"}
          alt={"pub image"}
          width={400}
          height={400}
        /> */}
      </div>

      {/* Date bloc */}
      <div className="px-2  py-3 border-t-2 border-gray-700 flex justify-start items-center gap-6 ">
        <p className="text-gray-500 italic">{tweet.updated_at.toUTCString()}</p>
      </div>

      {/* stats bloc */}
      <div className="px-2  py-3 border-y-2 border-gray-700 flex justify-start items-center gap-6 ">
        <Stats count={nbreReplies} name="Replies" />
        <Stats count={123} name="Quotes" />
        <Stats count={nbreLikes} name="Likes" />
        <Stats count={1} name="Bookmarks" />
      </div>

      {/* actions bloc */}
      <div className="px-5  pb-3 border-b-2 border-gray-700 flex justify-between   items-center">
        <ActionIcon size={iconSize} Icon={MessageCircle} />
        <ActionIcon size={iconSize} Icon={Repeat2} />
        <TweetLikes
          size={iconSize}
          show={false}
          id={tweet.id}
          islike={tweetlike?.isLike ? true : false}
          countLike={nbreLikes}
        />
        <ActionIcon size={iconSize} Icon={BarChart2} />

        <div className="pt-3">
          <Share color="gray" size={iconSize} />
        </div>
      </div>

      {/* comment form */}
      <ReplyTweetForm
        isconnected={session?.user?.email ? true : false}
        parentTweetId={params.tweetId}
      />

      {/* All Reposts */}
      <div className="ml-10">
        {tweetsReplies.map((tweet) => (
          <ReplyTweetView key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </section>
  );
};

export default page;

const Stats = ({ count, name }: { count: number; name: string }) => {
  return (
    <p className="text-gray-500 max-sm:text-[0.6rem]">
      <span className="text-white mr-1">{count}</span>
      {name}
    </p>
  );
};
