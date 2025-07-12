//清理工作空间
shx rm -rf dist && shx rm -rf node_modules
//安装依赖
node install
//构建项目
tsc && shx chmod +x dist/*.js
//删除多余文件保留.js文件
shx rm -rf dist/**/*.ts && shx rm -rf dist/**/*.map && shx rm -rf dist/**/*.map.js
//将*.js文件发布到npm仓库
npm publish --registry=https://repo.yyrd.com/artifactory/api/npm/ynpm-private/

//下载安装
npm install @wsx/ydevmcp@2.0.0

//java中使用

```

import com.fasterxml.jackson.databind.ObjectMapper;
import io.modelcontextprotocol.client.McpClient;
import io.modelcontextprotocol.client.McpSyncClient;
import io.modelcontextprotocol.client.transport.ServerParameters;
import io.modelcontextprotocol.client.transport.StdioClientTransport;
import io.modelcontextprotocol.spec.McpSchema;

import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class StdioClientMcp2Test {
    public static void main(String[] args) {
        StdioClientTransport transport = new StdioClientTransport(
                ServerParameters.builder("npx")
                        .args("-y", "@wsx/ydevmcp").build()
                , new ObjectMapper());
        McpSyncClient client = McpClient.sync(transport).clientInfo(new McpSchema.Implementation("my-mcp-client", "1.0.0"))
                .capabilities(McpSchema.ClientCapabilities.builder().roots(true).sampling().build())
                .requestTimeout(Duration.ofSeconds(60)).build();
        McpSchema.InitializeResult initialize = client.initialize();
        System.out.println("client initialized: " + initialize);
        tools(client); // 打印 MCP 工具列表
        getWeather(client);
    }

    public static void tools(McpSyncClient client) {
        McpSchema.ListToolsResult listToolsResult = client.listTools();
        listToolsResult.tools().forEach(System.out::println);
    }

    public static void getWeather(McpSyncClient client) {
        Map<String, Object> args = new HashMap<>();
        args.put("cityName", "北京");
        args.put("date", "2025-07-26");
        McpSchema.CallToolRequest callToolRequest = new McpSchema.CallToolRequest(
                "get_weather",
                args
        );
        McpSchema.CallToolResult callToolResult = client.callTool(callToolRequest);
        System.out.println(callToolResult.content());
    }


}

```