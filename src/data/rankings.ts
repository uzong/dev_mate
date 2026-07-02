import type { Ranking } from "@/types/resource";

export const rankings: Ranking[] = [
  {
    id: "popular",
    title: "本周热门",
    description: "综合热度、通用性和开发者日常使用频率排序。",
    resourceIds: ["vscode", "chatgpt", "github-copilot", "mdn", "cursor", "figma", "postman", "react-docs"],
  },
  {
    id: "featured",
    title: "编辑精选",
    description: "更适合作为首批收藏的高价值资源。",
    resourceIds: ["cursor", "vscode", "prettier", "roadmap", "excalidraw", "perplexity"],
  },
  {
    id: "newcomer",
    title: "新手友好",
    description: "学习成本低、资料充足、适合建立基础开发工作流。",
    resourceIds: ["freecodecamp", "javascript-info", "react-docs", "vscode", "mdn", "roadmap"],
  },
];
