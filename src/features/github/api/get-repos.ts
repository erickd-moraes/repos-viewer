import { api } from "@/lib/axios";
import type { GithubRepo } from "../types";

export async function getRepos(username: string): Promise<GithubRepo[]> {
  const { data } = await api.get(`/users/${username}/repos`);
  return data;
}
