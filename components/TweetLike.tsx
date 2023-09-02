"use client";

import { TweetLike } from "@prisma/client";
import { Heart } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LikeOrDislikeOnTweet } from "../src/db/tweet";
import toast from "react-hot-toast";

export const TweetLikes = ({
  id,
  islike,
  countLike,
}: {
  id: string;
  islike: boolean;
  countLike: number;
}) => {
  const router = useRouter();
  const { mutate, isLoading, isError } = useMutation(
    async ({ tweetId, islike }: { tweetId: string; islike: boolean }) =>
      LikeOrDislikeOnTweet(tweetId, islike),
    {
      onSettled: () => {
        router.refresh();
      },
      onSuccess: () => {
        toast.success("success");
      },
      onError: () => {
        toast.error("error");
      },
    }
  );
  const onSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    mutate({ tweetId: id, islike });
  };

  return (
    <div
      className={`text-gray-400 cursor-pointer transition-all delay-75 hover:text-red-500 text-[0.6rem] flex items-center gap-2 pt-3`}
      onClick={(e) => onSubmit(e)}
    >
      <Heart
        className={`text-gray-400 ${
          islike ? " text-red-500" : ""
        } hover:text-red-500 hover:shadow-xl hover:shadow-red-400`}
        size={18}
        fill={islike ? "red" : "black"}
      />
      <h1>{countLike}</h1>
    </div>
  );
};
