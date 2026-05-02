import { useQuery } from "@tanstack/react-query";
import { getRepo } from "../api/get-repo";

export function useRepo(fullName: string) {
  return useQuery({
    queryKey: ["repo", fullName],
    queryFn: () => getRepo(fullName),
    enabled: !!fullName,
  });
}