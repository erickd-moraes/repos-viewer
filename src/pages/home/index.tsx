import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { getRecentUsers } from "@/utils/recent-users";

import { RecentUserCard } from "./components/recent-user-card";

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const recentUsers = getRecentUsers();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim()) {
      return;
    }

    navigate(`/users/${username.trim()}`);
  }

  return (
    <div className="mx-auto mt-20 space-y-8 md:w-xl md:space-y-16">
      <div className="space-y-8">
        <section className="space-y-3 text-center">
          <h1 className="text-2xl font-bold md:text-4xl">
            Explore perfis do GitHub
          </h1>

          <p className="text-sm text-muted-foreground md:text-base">
            Busque usuários e descubra seus repositórios mais populares
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2 sm:flex-row"
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite um usuário do GitHub"
          />

          <Button type="submit" className="w-full sm:w-fit">
            Buscar
          </Button>
        </form>
      </div>

      {recentUsers.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Recentemente vistos</h2>
          <Separator className="bg-border/50" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recentUsers.map((user) => (
              <Link to={`/users/${user.login}`} key={user.login}>
                <RecentUserCard user={user} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
