import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { getRecentUsers } from "./utils/get-recent-users";

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
    <div className="mx-auto mt-20 space-y-6 md:w-xl md:space-y-12">
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

      {recentUsers.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Recentemente vistos</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {recentUsers.map((user) => (
              <Button
                key={user.login}
                variant={"secondary"}
                onClick={() => navigate(`/users/${user.login}`)}
                className="flex flex-col items-center rounded-lg border p-3 transition hover:bg-muted"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="h-12 w-12 rounded-full"
                />

                <span className="mt-2 w-full truncate text-center text-sm">
                  {user.login}
                </span>
              </Button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
