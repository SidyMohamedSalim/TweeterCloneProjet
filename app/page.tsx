import TweetCard from "../components/TweetCard";
import AddTweet from "../components/AddTweet";

import { getServerSession } from "next-auth/next";
import prisma from "../lib/prisma";
import FilterTweets from "@/components/FilterTweets";
import { getTweets } from "../src/server/tweet";

export default async function Home() {
  let etats = "all";

  const session = await getServerSession();

  const tweets = await getTweets();

  return (
    <main>
      <div className="font-extrabold text-start  ">
        <h1 className="sm:ml-5 text-xl pb-6 pt-3">Home</h1>
      </div>
      <AddTweet
        sessionEmail={session?.user?.email ?? ""}
        connected={session?.user ? true : false}
      />
      <section>
        <FilterTweets etats={etats} />
        <div className="w-full flex flex-col justify-center items-center">
          {tweets?.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </section>
    </main>
  );
}
