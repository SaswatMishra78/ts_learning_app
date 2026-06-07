export type GitHubEnv = {
  token: string;
  owner: string;
  repo: string;
};

export function loadEnv(): GitHubEnv {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token) throw new Error("GITHUB_TOKEN is required");
  if (!owner) throw new Error("GITHUB_OWNER is required");
  if (!repo) throw new Error("GITHUB_REPO is required");

  return { token, owner, repo };
}
