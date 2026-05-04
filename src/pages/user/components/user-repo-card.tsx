import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { GithubRepo } from "@/features/github/types";

export function UsersRepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{repo.name}</h3>

          <Badge variant="secondary">
            <Star size={16} className="text-yellow-600 dark:text-yellow-500" />
            <span>{repo.stargazers_count}</span>
          </Badge>
        </div>

        {repo.description && (
          <p className="text-sm text-muted-foreground">{repo.description}</p>
        )}

        {repo.language && (
          <Badge variant={"outline"} className="text-xs">
            {repo.language}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
