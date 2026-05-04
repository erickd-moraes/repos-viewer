import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { GithubUser } from "@/features/github/types";

export function UserInfoCard({ user }: { user: GithubUser }) {
  return (
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
  );
}
