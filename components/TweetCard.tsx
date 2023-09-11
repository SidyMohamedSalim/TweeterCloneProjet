import { Tweet, TweetLike } from "@prisma/client";
import {
  BarChart2,
  Heart,
  LucideIcon,
  MessageCircle,
  Repeat2,
  Share,
  User2,
} from "lucide-react";
import React from "react";
import { TweetLikes } from "./TweetLike";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import AvatarA from "./AvatarA";
import Image from "next/image";
import { formatDate } from "src/config/formatDate";

const TweetCard = async ({ tweet }: { tweet: Tweet }) => {
  const session = await getServerSession();
  const user = await prisma?.user.findUnique({
    where: { email: tweet.userEmail },
  });

  const tweetlike = await prisma?.tweetLike.findUnique({
    where: {
      userEmail_TweetId: {
        userEmail: session?.user?.email ?? "",
        TweetId: tweet.id,
      },
    },
  });

  const parentTweet = await prisma?.tweet.findUnique({
    where: { id: tweet.tweetParentId ?? "" },
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

  return await (
    <section className="w-full  my-2 p-3 text-sm font-semibold border-gray-700 rounded-lg border ">
      {parentTweet && (
        <p className="text-xs opacity-50 pb-2 text-end italic">
          replied to{" "}
          <Link className="text-sky-500" href={`/tweets/${parentTweet.id}`}>
            {parentTweet.userEmail}
          </Link>
        </p>
      )}
      <Link href={`/tweets/${tweet.id}`}>
        {/* user information bloc */}
        <div className="flex items-start justify-between">
          <AvatarA name={user?.name} email={user?.email} />
          <p className="text-xs text-gray-500">
            {formatDate(new Date(tweet.created_at))}
          </p>
        </div>

        {/* image  bloc */}
        <div className="pl-14 w-full">
          <p className="mr-auto">{tweet.content}</p>
          {/* <Image
            className="w-full border border-gray-600 rounded-lg hover:opacity-50 cursor-pointer"
            src={"/pub.jpg"}
            alt={"pub image"}
            width={400}
            height={400}
          /> */}
        </div>

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
      </Link>
    </section>
  );
};

export default TweetCard;

export const ActionIcon = ({
  nbr,
  Icon,
  size,
}: {
  nbr?: number;
  Icon: LucideIcon;
  size?: number;
}) => {
  return (
    <div
      className={`text-gray-400 cursor-pointer hover:text-sky-500 text-[0.6rem] flex items-center gap-2 pt-3`}
    >
      <Icon
        className={`text-gray-400 hover:text-sky-500 hover:shadow-xl hover:shadow-sky-400`}
        size={size ? size : 18}
      />
      <h1>{nbr}</h1>
    </div>
  );
};
