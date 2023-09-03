import { client } from "./client";

export async function getAllFollowers() {
  return await client(`/api/users/follows/`, {
    method: "GET",
  });
}

export const getOneFollow = async (userFollowsId: string) =>
  await client(`/api/users/follows/${userFollowsId}`, {
    method: "GET",
  });

export const followAndUnfollow = async (userId: string, isFollow: boolean) =>
  await client(`/api/users/follows/${userId}`, {
    method: isFollow ? "DELETE" : "POST",
  });
