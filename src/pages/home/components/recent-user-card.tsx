import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import type { RecentUser } from "@/utils/recent-users";

export function RecentUserCard({ user }: { user: RecentUser }) {
  return (
    <Card>
      <CardContent>
        <div className="flex w-full items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>
              {user.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <p className="w-full overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
              {user.name ?? user.login}
            </p>

            <span className="text-xs text-muted-foreground">@{user.login}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
