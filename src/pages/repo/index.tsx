import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";

import { useRepo } from "@/features/github/hooks/use-repo";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RepoPage() {
  const { username, repo } = useParams();

  const { data, isLoading, isError, error } = useRepo(`${username}/${repo}`);

  if (isLoading) {
    return (
      <div className="w-full space-y-4 py-8">
        <Skeleton className="h-57 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError) {
    const status = (error as { response?: { status?: number } })?.response
      ?.status;

    if (status === 404) {
      return (
        <div className="w-full space-y-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Repositório não encontrado</h1>

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

  if (!data) return null;

  return (
    <div className="w-full space-y-4 py-8">
      <Button variant="outline" asChild>
        <Link to={`/users/${username}`}>Voltar para usuário</Link>
      </Button>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{data.name}</h1>

            {data.description && (
              <p className="text-muted-foreground">{data.description}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">
              <Star
                size={16}
                className="text-yellow-600 dark:text-yellow-500"
              />
              <span>{data.stargazers_count}</span>
            </Badge>

            {data.language && <Badge variant="outline">{data.language}</Badge>}
          </div>

          <div className="flex gap-2 pt-2">
            <Button asChild>
              <a href={data.html_url} target="_blank" rel="noopener noreferrer">
                Ver no GitHub
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
