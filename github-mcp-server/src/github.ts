import type { GitHubEnv } from "./env.js";

const API = "https://api.github.com";

type RequestOptions = {
  method?: string;
  body?: unknown;
};

export class GitHubClient {
  constructor(private env: GitHubEnv) {}

  private async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const res = await fetch(`${API}${path}`, {
      method: options.method ?? "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.env.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "User-Agent": "github-mcp-server",
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const msg =
        typeof data?.message === "string"
          ? data.message
          : `GitHub API error ${res.status}`;
      throw new Error(msg);
    }

    return data as T;
  }

  private repoPath(suffix: string) {
    return `/repos/${this.env.owner}/${this.env.repo}${suffix}`;
  }

  async getIssue(issueNumber: number) {
    const issue = await this.request<Record<string, unknown>>(
      this.repoPath(`/issues/${issueNumber}`)
    );
    const comments = await this.request<unknown[]>(
      this.repoPath(`/issues/${issueNumber}/comments`)
    );
    return { issue, comments };
  }

  async createIssue(input: {
    title: string;
    body?: string;
    labels?: string[];
    assignees?: string[];
  }) {
    return this.request(this.repoPath("/issues"), {
      method: "POST",
      body: input,
    });
  }

  async createPullRequest(input: {
    title: string;
    head: string;
    base: string;
    body?: string;
    draft?: boolean;
  }) {
    return this.request(this.repoPath("/pulls"), {
      method: "POST",
      body: input,
    });
  }

  async getPullRequest(pullNumber: number) {
    return this.request(this.repoPath(`/pulls/${pullNumber}`));
  }

  async listPullRequests(input: { state?: "open" | "closed" | "all"; limit?: number }) {
    const state = input.state ?? "open";
    const limit = Math.min(Math.max(input.limit ?? 10, 1), 100);
    const params = new URLSearchParams({
      state,
      per_page: String(limit),
    });
    return this.request<unknown[]>(`${this.repoPath("/pulls")}?${params}`);
  }
}
