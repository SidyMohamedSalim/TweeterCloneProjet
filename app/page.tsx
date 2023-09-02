import TweetCard from "../components/TweetCard";
import AddTweet from "../components/AddTweet";
import Headers from "./header";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession();
  const tweets = await prisma?.tweet.findMany({
    orderBy: { created_at: "desc" },
  });
  return (
    <div className="grid grid-cols-10  max-w-6xl mx-auto text-white">
      <Headers />
      <main className="col-span-5 max-md:col-span-8 w-full h-screen overflow-y-scroll  ">
        <div className="font-extrabold text-start  ">
          <h1 className="sm:ml-5 text-xl pb-6 pt-3">Home</h1>
        </div>
        <AddTweet connected={session?.user ? true : false} />
        <div className="w-full flex flex-col justify-center items-center">
          {tweets?.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </main>
    </div>
  );
}
