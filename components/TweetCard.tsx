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

  const allLikes = await prisma?.tweetLike.findMany({
    where: {
      TweetId: tweet.id,
    },
  });
  const nbreLikes = allLikes?.length ?? 0;

  return (
    <section className="max-w-lg min-w-[24rem] mr-4 my-2 p-3 text-sm font-semibold border-gray-700 rounded-lg border ">
      {/* user information bloc */}
      <div className="flex gap-2 justify-start items-start">
        <div className=" bg-gray-600 w-10 h-10 rounded-lg flex items-center justify-center">
          <User2 size={20} />
        </div>
        <div>
          <h1 className="font-extrabold">{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
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
        <ActionIcon nbr={70} color="green" Icon={MessageCircle} />
        <ActionIcon nbr={510} color="sky" Icon={Repeat2} />
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
    </section>
  );
};

export default TweetCard;

const ActionIcon = ({
  nbr,
  Icon,
  color,
}: {
  nbr: number;
  Icon: LucideIcon;
  color?: string;
}) => {
  return (
    <div
      className={`text-gray-400 cursor-pointer hover:text-sky-500 text-[0.6rem] flex items-center gap-2 pt-3`}
    >
      <Icon
        className={`text-gray-400 hover:text-sky-500 hover:shadow-xl hover:shadow-sky-400`}
        size={18}
      />
      <h1>{nbr}</h1>
    </div>
  );
};
