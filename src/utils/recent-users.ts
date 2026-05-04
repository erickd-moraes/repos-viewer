type RecentUser = {
  login: string;
  avatar_url: string;
  name: string;
};

const STORAGE_KEY = "recent-users";

export function getRecentUsers(): RecentUser[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentUser(user: RecentUser) {
  const existing = getRecentUsers();

  const updated = [
    user,
    ...existing.filter((u) => u.login !== user.login),
  ].slice(0, 6);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
