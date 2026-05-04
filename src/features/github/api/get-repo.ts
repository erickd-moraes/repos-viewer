import { api } from "@/lib/axios";
import type { GithubRepo } from "../types";

export async function getRepo(fullName: string): Promise<GithubRepo> {
  const { data } = await api.get(`/repos/${fullName}`);
  return data;
}
