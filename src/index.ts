#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerWeatherTool } from './mcp/tools/weather.js';

const mcpServer = new McpServer({
  name: 'yesdev-mcp-server',
  version: '2.0.0',
});
const registeredToolNames = new Set<string>();
const toolsets = [
  registerWeatherTool,
];
toolsets.forEach(registerToolset => {
  const tools = registerToolset(mcpServer);
  tools.forEach(toolName => {
    registeredToolNames.add(toolName);
  });
});

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.log("MCP server is running...");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});