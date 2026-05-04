import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p>Página não encontrada</p>

        <Button asChild>
          <Link to="/">Voltar para home</Link>
        </Button>
      </div>
    </div>
  );
}
