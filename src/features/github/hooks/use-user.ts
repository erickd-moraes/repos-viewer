import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/get-users";

export function useUser(username: string) {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
    enabled: !!username,
  });
}