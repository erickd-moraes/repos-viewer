import { api } from "@/lib/axios";
import type { GithubUser } from "../types";

export async function getUser(username: string): Promise<GithubUser> {
  const { data } = await api.get(`/users/${username}`);
  return data;
}