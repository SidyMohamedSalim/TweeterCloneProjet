import prisma from "@/lib/prisma";
import { Followers, Tweet, TweetLike } from "@prisma/client";

export const getTweets = async () =>
  await prisma?.tweet.findMany({
    orderBy: { created_at: "desc" },
  });

export const getTweetsByEmail = async (email: string) =>
  await prisma?.tweet.findMany({
    where: { userEmail: email },
    orderBy: { created_at: "desc" },
  });

export const getOnetweet = async (id: string) =>
  await prisma.tweet.findUnique({
    where: { id },
  });

export const gettweetsReplies = async (tweetParentId: string) =>
  await prisma.tweet.findMany({
    where: {
      tweetParentId,
    },
    orderBy: { created_at: "desc" },
  });

export const gettweetlike = async (userEmail: string, TweetId: string) =>
  await prisma?.tweetLike.findUnique({
    where: {
      userEmail_TweetId: {
        userEmail,
        TweetId,
      },
    },
  });

export const getallLikes = async (TweetId: string) =>
  await prisma?.tweetLike.findMany({
    where: {
      TweetId,
    },
  });

export const getallRelplies = async (tweetParentId: string) =>
  await prisma?.tweet.findMany({
    where: {
      tweetParentId,
    },
  });

export const getnbreReplies = (tweets: Tweet[]) => tweets?.length ?? 0;
export const getnbreLikes = (tweets: TweetLike[]) => tweets?.length ?? 0;
export const getUser = async (email: string) =>
  await prisma?.user.findUnique({
    where: { email },
  });

export const getfollowings = async (email: string) =>
  await prisma.followers.findMany({
    where: { userEmail: email },
  });

export const getfollowers = async (email: string) =>
  await prisma.followers.findMany({
    where: { userFollows: email },
  });

export const calculFollows = (followings: Followers[]) =>
  followings.length ?? 0;
