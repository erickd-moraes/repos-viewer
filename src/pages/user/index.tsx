import { useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";

import { useUser } from "@/features/github/hooks/use-user";
import { useRepos } from "@/features/github/hooks/use-repos";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card>
        <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row">
          <Avatar className="size-32">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>
              {user.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="w-full space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{user.name ?? user.login}</h1>

              <h3 className="font-semibold text-muted-foreground">
                {user.login}
              </h3>
            </div>

            <Separator className="bg-border/50" />

            <div className="space-y-2">
              {user.bio && <p>{user.bio}</p>}

              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Seguidores:</span>
                  <span className="font-semibold"> {user.followers}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Seguindo:</span>
                  <span className="font-semibold"> {user.following}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <Card>
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{repo.name}</h3>

                    <div className="flex items-center gap-1 text-sm">
                      <Star
                        size={16}
                        className="text-yellow-600 dark:text-yellow-500"
                      />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>

                  {repo.description && (
                    <p className="text-sm text-muted-foreground">
                      {repo.description}
                    </p>
                  )}

                  {repo.language && (
                    <Badge className="text-xs">{repo.language}</Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
