import type { Topic } from "@/types/resource";

export const topics: Topic[] = [
  {
    id: "frontend-toolbox",
    title: "前端开发必备工具箱",
    summary: "从编辑器、格式化、兼容性检查到包体积分析，覆盖前端日常高频场景。",
    resourceIds: ["vscode", "prettier", "mdn", "caniuse", "bundlephobia", "stackblitz"],
    tags: ["前端", "工具箱", "效率"],
  },
  {
    id: "api-debugging",
    title: "API 调试与接口协作",
    summary: "适合后端接口调试、前后端联调、环境变量和请求集合管理。",
    resourceIds: ["postman", "thunder-client", "regex101", "vscode"],
    tags: ["API", "接口调试", "协作"],
  },
  {
    id: "ai-coding",
    title: "AI 编程效率组合",
    summary: "覆盖 AI 编辑器、补全、代码库问答、PR 审查和资料检索。",
    resourceIds: ["cursor", "github-copilot", "continue", "claude", "coderabbit", "sourcegraph-cody"],
    tags: ["AI", "编程", "效率"],
  },
  {
    id: "solo-launch",
    title: "独立开发者上线工具箱",
    summary: "帮助独立开发者从原型、开发、文档、任务管理到发布前准备。",
    resourceIds: ["figma", "notion", "linear", "docker-desktop", "github-copilot", "product-hunt"],
    tags: ["独立开发", "产品", "上线"],
  },
  {
    id: "daily-online-tools",
    title: "程序员常用在线工具",
    summary: "日常调试、格式化、截图、文档查询和代码分享的轻量工具集合。",
    resourceIds: ["regex101", "carbon", "mdn", "caniuse", "bundlephobia", "stackblitz"],
    tags: ["在线工具", "调试", "分享"],
  },
  {
    id: "product-design",
    title: "产品与设计协作工具",
    summary: "适合需求梳理、界面原型、架构草图、知识库和研发协作。",
    resourceIds: ["figma", "excalidraw", "notion", "linear", "coolors", "product-hunt"],
    tags: ["设计", "产品", "协作"],
  },
];
