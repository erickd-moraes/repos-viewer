export interface GithubUser {
  login: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  email: string | null;
  name: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}
