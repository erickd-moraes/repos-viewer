type RecentUser = {
  login: string;
  avatar_url: string;
};

const STORAGE_KEY = "recent-users";

export function getRecentUsers(): RecentUser[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
