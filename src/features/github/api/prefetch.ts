import { QueryClient } from "@tanstack/react-query";
import { getRepo } from "./get-repo";
import { githubKeys } from "./query-keys";

export function prefetchRepo(
  queryClient: QueryClient,
  fullName: string
) {
  return queryClient.prefetchQuery({
    queryKey: githubKeys.repo(fullName),
    queryFn: () => getRepo(fullName),
  });
}