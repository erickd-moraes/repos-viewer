import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="flex items-center justify-center border-t p-4">
      <span className="text-sm text-muted-foreground">
        Feito por
        <Button variant={"link"} className="px-1 font-semibold" asChild>
          <a
            href="https://www.linkedin.com/in/erickd-mooraes/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Erick Moraes
          </a>
        </Button>
      </span>
    </footer>
  );
}
