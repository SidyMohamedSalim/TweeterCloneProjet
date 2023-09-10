"use client";
import React from "react";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { addTweetClient } from "src/db/tweet";
import toast from "react-hot-toast";
import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

const ReplyTweetForm = ({
  isconnected,
  parentTweetId,
  label,
}: {
  isconnected: boolean;
  parentTweetId: string;
  label?: string;
}) => {
  const router = useRouter();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    async ({
      content,
      parentTweetId,
    }: {
      content: string;
      parentTweetId: string;
    }) => await addTweetClient(content, parentTweetId),
    {
      onError: () => {
        toast.error("probleme");
      },
      onSuccess: () => {
        toast.success("success");
        router.refresh();
      },
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const content = form.get("content")?.toString();
    if (content) {
      mutate({ content, parentTweetId: parentTweetId });
      e.currentTarget.reset();
    } else {
      toast("erreur de remplissage");
    }
  };

  return isconnected ? (
    <div className="pt-4 pb-6 my-4 gap-3 border-b-2 border-gray-700 flex justify-between   items-center px-3">
      <div className=" bg-gray-600 w-14 h-14 rounded-full flex items-center justify-center px-2">
        <User2 size={25} />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        action=""
        className="flex-grow flex justify-between gap-4 items-center"
      >
        <input
          className=" w-full h-full pt-4 pb-1 bg-transparent  border-gray-500 px-2   outline-none focus:outline-none"
          type="text"
          name="content"
          id={label}
          placeholder="Post Your Reply!"
        />
        <div className="flex items-end justify-end my-2">
          <button
            className="bg-sky-500 px-4 text-sm hover:bg-sky-600 py-1 rounded-md"
            placeholder=""
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex justify-center items-center py-4  px-2 rounded-lg">
      <Link href={"/login"} className="text-sky-500 mr-2  hover:italic">
        Connectez-Vous
      </Link>
      pour pouvoir repondre
    </div>
  );
};

export default ReplyTweetForm;
