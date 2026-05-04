import { useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";

import { useUser } from "@/features/github/hooks/use-user";
import { useRepos } from "@/features/github/hooks/use-repos";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { addRecentUser } from "@/utils/recent-users";

import { UserInfoCard } from "./components/user-info-card";
import { UsersRepoCard } from "./components/user-repo-card";

export default function UserPage() {
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get("sort") as "stars" | "name") ?? "stars";

  const {
    data: user,
    isLoading: isUserLoading,
    isError,
    error,
  } = useUser(username!);

  const { data: repos, isLoading: isReposLoading } = useRepos(username!, sort);

  useEffect(() => {
    if (user) {
      addRecentUser({
        login: user.login,
        avatar_url: user.avatar_url,
        name: user.name ?? user.login,
      });
    }
  }, [user]);

  if (isUserLoading) {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  if (isError) {
    const status = (error as { response?: { status?: number } })?.response
      ?.status;

    if (status === 404) {
      return (
        <div className="w-full space-y-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Usuário não encontrado</h1>

          <Button asChild>
            <Link to="/">Voltar para home</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="w-full space-y-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Ocorreu um erro!</h1>
        <p className="text-muted-foreground">Tente novamente mais tarde</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full space-y-8 py-8">
      <div className="space-y-4">
        <Button variant="outline" asChild>
          <Link to={"/"}>Voltar</Link>
        </Button>

        <UserInfoCard user={user} />
      </div>

      <div className="flex justify-end">
        <Select
          value={sort}
          onValueChange={(value) => setSearchParams({ sort: value })}
        >
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="stars">Mais estrelas</SelectItem>
            <SelectItem value="name">Nome</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Repositórios</h2>
        <Separator className="bg-border/50" />

        {isReposLoading && (
          <div className="space-y-2">
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
          </div>
        )}

        {!isReposLoading && repos?.length === 0 && (
          <p className="text-muted-foreground">
            Este usuário não possui repositórios públicos.
          </p>
        )}

        <div className="grid gap-3">
          {repos?.map((repo) => (
            <Link key={repo.id} to={`/users/${user.login}/repos/${repo.name}`}>
              <UsersRepoCard repo={repo} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
