import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link to="/" className="font-bold">
        Repos Viewer
      </Link>
      <ModeToggle />
    </header>
  );
}
