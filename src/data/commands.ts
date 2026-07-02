import type { SearchCommand } from "@/types/resource";

export const commands: SearchCommand[] = [
  {
    id: "submit-resource",
    label: "提交资源",
    description: "推荐一个新的开发工具、插件、网站或学习资源。",
    keywords: ["提交", "推荐", "submit", "resource", "/submit"],
    action: "submit",
    target: "/submit",
  },
  {
    id: "feedback",
    label: "反馈问题",
    description: "报告链接失效、信息错误或推荐不准确。",
    keywords: ["反馈", "问题", "失效", "feedback", "/feedback"],
    action: "feedback",
    target: "/submit",
  },
  {
    id: "favorites",
    label: "查看收藏",
    description: "打开浏览器本地收藏的资源列表。",
    keywords: ["收藏", "favorites", "saved", "/favorites"],
    action: "navigate",
    target: "/favorites",
  },
  {
    id: "rankings",
    label: "查看榜单",
    description: "查看热门、精选和新手友好资源排行。",
    keywords: ["榜单", "排行", "rank", "ranking", "/rankings"],
    action: "navigate",
    target: "/rankings",
  },
  {
    id: "topics",
    label: "查看专题",
    description: "按开发场景浏览资源组合。",
    keywords: ["专题", "合集", "topic", "topics", "/topics"],
    action: "navigate",
    target: "/topics",
  },
];
