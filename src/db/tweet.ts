import { client } from "./client";

export async function addTweetClient(content: string) {
  return await client(`/api/tweets/add`, {
    data: { content },
    method: "POST",
  });
}
