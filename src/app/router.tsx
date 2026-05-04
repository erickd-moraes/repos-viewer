import { createBrowserRouter, Outlet } from "react-router-dom";

import HomePage from "@/pages/home";
import UserPage from "@/pages/user";
import RepoPage from "@/pages/repo";
import NotFoundPage from "@/pages/not-found";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="container mx-auto flex min-h-screen flex-col">
        <Header />

        <main className="mx-auto flex w-full max-w-7xl flex-1 p-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/users/:username",
        element: <UserPage />,
      },
      {
        path: "/users/:username/repos/:repo",
        element: <RepoPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
