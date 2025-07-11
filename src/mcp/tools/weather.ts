import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerWeatherTool(mcpServer: McpServer): Set<string> {
    const registeredTools = new Set<string>();
    

    mcpServer.registerTool(
  "get_weather",
  {
    description: "Summarize any text using an LLM",
    inputSchema: {
      cityName: z.string().describe("The name of the text to summarize"),
      date: z.string().describe("The date to get the weather for"),
    }
  },
  async ({ cityName, date}) => {
    // Call the LLM through MCP sampling
    const response = await mcpServer.server.createMessage({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please summarize the following text concisely:\n\n${text}`,
          },
        },
      ],
      maxTokens: 500,
    });

    return {
      content: [
        {
          type: "text",
          text: response.content.type === "text" ? response.content.text : "Unable to generate summary",
        },
      ],
    };
  }
);
    registeredTools.add('get_weather');
    return registeredTools;
}