import { client } from "./client";

export async function addTweetClient(content: string, tweetParentId?: string) {
  return await client(`/api/tweets/add`, {
    data: { content, tweetParentId },
    method: "POST",
  });
}

export const LikeOrDislikeOnTweet = async (tweetId: string, exits: boolean) => {
  return await client(`/api/tweets/${tweetId}/like`, {
    method: exits ? "DELETE" : "POST",
  });
};
