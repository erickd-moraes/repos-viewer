import { useQuery } from "@tanstack/react-query";
import { getRepos } from "../api/get-repos";
import type { GithubRepo } from "../types";

export type RepoSort = "stars" | "name";

function sortRepos(repos: GithubRepo[], sort: RepoSort) {
  if (sort === "stars") {
    return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  }

  return [...repos].sort((a, b) => a.name.localeCompare(b.name));
}

export function useRepos(username: string, sort: RepoSort) {
  return useQuery({
    queryKey: ["repos", username, sort],
    queryFn: async () => {
      const repos = await getRepos(username);
      return sortRepos(repos, sort);
    },
    enabled: !!username,
  });
}
