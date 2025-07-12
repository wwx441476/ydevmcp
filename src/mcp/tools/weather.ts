import { z, ZodType } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerWeatherTool(mcpServer: McpServer): Set<string> {
  const registeredTools = new Set<string>();


  mcpServer.registerTool(
    "get_weather",
    {
      description: "Summarize any text using an LLM",
      inputSchema: {
        cityName: z.string().describe("The name of the city to get the weather for") as unknown as ZodType,
        date: z.string().describe("The date to get the weather for, in the format YYYY-MM-DD , e.g. 2023-10-01, or 'today' for the current date"),
      }
    },
    async ({ cityName, date }) => {


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