"use client";
import { useMutation } from "@tanstack/react-query";
import { SendHorizonal, User2 } from "lucide-react";
import React from "react";
import { FormEvent } from "react";
import { addTweetClient } from "src/db/tweet";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AvatarUser from "./AvatarUser";

const AddTweet = ({
  connected,
  sessionEmail,
}: {
  sessionEmail?: string;
  connected: boolean;
}) => {
  const router = useRouter();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    async (content: string) => await addTweetClient(content),
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
      mutate(content);
      e.currentTarget.reset();
    } else {
      toast("erreur de remplissage");
    }
  };
  return (
    <div>
      {connected ? (
        <div className="flex ml-1 gap-4 items-start">
          <AvatarUser email={sessionEmail ?? ""} />
          <form
            action="submit"
            onSubmit={(e) => handleSubmit(e)}
            className="pb-4 w-full "
          >
            <input
              className="min-w-full text-xl w-full py-2 bg-transparent outline-none hover:outline-none focus:outline-none border-b border-gray-700 mr-6 pb-4 mb-4"
              placeholder="What is happening?!"
              name="content"
            />
            <div className="flex items-end justify-end mr-6">
              <button placeholder="" type="submit">
                {""} <SendHorizonal className="text-sky-500" size={30} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center py-4  px-2 rounded-lg">
          <Link href={"/login"} className="text-sky-500 mr-2  hover:italic">
            Connectez-Vous
          </Link>
          pour envoyer votre premier Tweet
        </div>
      )}
    </div>
  );
};

export default AddTweet;
