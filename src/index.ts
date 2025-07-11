#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerWeatherTool } from './mcp/tools/weather.js';
import dotenv from 'dotenv';

dotenv.config();
async function main() {
    try {
        const server = new McpServer({
            name: 'yesdev-mcp-server',
            version: '1.0.0',
        });
        console.log('正在注册工具...');
        const registeredToolNames = new Set<string>();
        const toolsets = [
            registerWeatherTool,
        ];
        toolsets.forEach(registerToolset => {
            const tools = registerToolset(server);
            tools.forEach(toolName => {
            registeredToolNames.add(toolName);
        });
    });
        const transport = new StdioServerTransport();
        server.connect(transport);
        console.log('Starting MCP Server...');
        console.log('已注册的工具:', Array.from(registeredToolNames));
    } catch (error) {
        console.error('Error starting MCP Server:', error);
    }
    
}

main();