export function profileHref(username: string | null, path: string) {
  if (!username) return path;
  if (path.startsWith("/#")) return `/${username}${path.slice(1)}`;
  if (path.startsWith("#")) return `/${username}${path}`;
  return path;
}
