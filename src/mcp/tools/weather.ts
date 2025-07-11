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
    

    return {
      content: [
        {
          type: "text",
          text: "The weather in " + cityName + " on " + date + " is sunny with a high of 25°C and a low of 15°C.",
        },
      ],
    };
  }
);
    registeredTools.add('get_weather');
    return registeredTools;
}