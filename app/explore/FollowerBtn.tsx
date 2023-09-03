"use client";
import Btn from "@/components/Btn";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOneFollow } from "src/db/follows";
import { followAndUnfollow } from "../../src/db/follows";
import toast from "react-hot-toast";

const FollowerBtn = ({
  userId,
  isFollow,
}: {
  userId: string;
  isFollow: boolean;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  //   const { data } = useQuery({
  //     queryKey: ["follow", userId],
  //     queryFn: async () => await getOneFollow(userId),
  //   });
  //   const isFollow = data ? true : false;

  const { mutate, isLoading } = useMutation(
    async ({ userId, isfollow }: { userId: string; isfollow: boolean }) =>
      await followAndUnfollow(userId, isfollow),
    {
      onSuccess: () => {
        toast.success(isFollow ? "unfollow" : "follow");
      },
      onError: () => {
        toast.error("error");
      },
      onSettled: () => {
        router.refresh();
      },
    }
  );

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ userId, isfollow: isFollow });
  };

  return (
    <div>
      {!isFollow ? (
        <button
          onClick={(e) => {
            onClick(e);
          }}
          className="text-black hover:bg-opacity-90 px-3 py-1 rounded-2xl bg-white"
        >
          <span>follow</span>
        </button>
      ) : (
        <button
          onClick={(e) => {
            onClick(e);
          }}
          className="px-3 hover:bg-gray-800 py-1 rounded-2xl border border-1"
        >
          <span>Unfollow</span>
        </button>
      )}
    </div>
  );
};
export default FollowerBtn;
