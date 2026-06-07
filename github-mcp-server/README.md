# GitHub MCP Server

Minimal GitHub MCP server for Cursor (stdio, TypeScript, `fetch`).

## PAT scopes

Create a fine-grained or classic PAT with:

| Scope | Why |
|-------|-----|
| `repo` (classic) or **Contents + Issues + Pull requests** (fine-grained) | Read/write issues and PRs |
| `read:org` (optional) | If the repo is under an org with SSO |

Fine-grained token: grant access to the target repository only.

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | yes | GitHub PAT |
| `GITHUB_OWNER` | yes | org or user |
| `GITHUB_REPO` | yes | repository name |

## Setup

```bash
cd github-mcp-server
npm install
npm run build
```

## Cursor MCP config

Add to `~/.cursor/mcp.json` (or project `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["/absolute/path/to/github-mcp-server/dist/index.js"],
      "env": {
        "GITHUB_TOKEN": "ghp_...",
        "GITHUB_OWNER": "your-org",
        "GITHUB_REPO": "your-repo"
      }
    }
  }
}
```

Restart Cursor after saving.

## Tools

| Tool | Description |
|------|-------------|
| `get_issue` | Issue + comments (`issue_number`) |
| `create_issue` | `title` (required), `body`, `labels`, `assignees` |
| `create_pull_request` | `title`, `head`, `base` (required), `body`, `draft` |
| `get_pull_request` | PR details (`pull_number`) |
| `list_pull_requests` | `state` (`open`/`closed`/`all`), `limit` |
