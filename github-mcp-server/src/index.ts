import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { GitHubClient } from "./github.js";
import { loadEnv } from "./env.js";

function jsonResult(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function errorResult(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return {
    isError: true as const,
    content: [{ type: "text" as const, text: message }],
  };
}

async function main() {
  const env = loadEnv();
  const github = new GitHubClient(env);

  const server = new McpServer({
    name: "github-mcp-server",
    version: "1.0.0",
  });

  server.registerTool(
    "get_issue",
    {
      description: "Get issue details and comments",
      inputSchema: z.object({
        issue_number: z.number().int().positive(),
      }),
    },
    async ({ issue_number }) => {
      try {
        return jsonResult(await github.getIssue(issue_number));
      } catch (e) {
        return errorResult(e);
      }
    }
  );

  server.registerTool(
    "create_issue",
    {
      description: "Create a new issue",
      inputSchema: z.object({
        title: z.string().min(1),
        body: z.string().optional(),
        labels: z.array(z.string()).optional(),
        assignees: z.array(z.string()).optional(),
      }),
    },
    async (input) => {
      try {
        return jsonResult(await github.createIssue(input));
      } catch (e) {
        return errorResult(e);
      }
    }
  );

  server.registerTool(
    "create_pull_request",
    {
      description: "Create a pull request",
      inputSchema: z.object({
        title: z.string().min(1),
        head: z.string().min(1),
        base: z.string().min(1),
        body: z.string().optional(),
        draft: z.boolean().optional(),
      }),
    },
    async (input) => {
      try {
        return jsonResult(await github.createPullRequest(input));
      } catch (e) {
        return errorResult(e);
      }
    }
  );

  server.registerTool(
    "get_pull_request",
    {
      description: "Get pull request details",
      inputSchema: z.object({
        pull_number: z.number().int().positive(),
      }),
    },
    async ({ pull_number }) => {
      try {
        return jsonResult(await github.getPullRequest(pull_number));
      } catch (e) {
        return errorResult(e);
      }
    }
  );

  server.registerTool(
    "list_pull_requests",
    {
      description: "List pull requests",
      inputSchema: z.object({
        state: z.enum(["open", "closed", "all"]).optional(),
        limit: z.number().int().positive().max(100).optional(),
      }),
    },
    async (input) => {
      try {
        return jsonResult(await github.listPullRequests(input));
      } catch (e) {
        return errorResult(e);
      }
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`github-mcp-server ready (${env.owner}/${env.repo})`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
