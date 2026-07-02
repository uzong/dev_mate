import type { FeedbackType, ResourceItem } from "@/types/resource";

const GITHUB_ISSUE_BASE = "https://github.com/uzong/dev_mate/issues/new";

const feedbackLabels: Record<FeedbackType, string> = {
  "broken-link": "链接失效",
  "wrong-info": "信息错误",
  "not-recommended": "资源不推荐",
  "suggest-resource": "推荐新资源",
  other: "其他建议",
};

export const createIssueUrl = (title: string, body: string) => {
  const params = new URLSearchParams({ title, body });
  return `${GITHUB_ISSUE_BASE}?${params.toString()}`;
};

export const createFeedbackIssueUrl = (type: FeedbackType, resource?: ResourceItem) => {
  const label = feedbackLabels[type];
  const title = resource ? `[资源反馈] ${resource.name} - ${label}` : `[问题反馈] ${label}`;
  const body = [
    resource ? `资源名称：${resource.name}` : "资源名称：",
    resource ? `资源链接：${resource.url}` : "资源链接：",
    `问题类型：${label}`,
    "问题描述：",
    "建议修改：",
  ].join("\n");

  return createIssueUrl(title, body);
};

export const createSubmitIssueUrl = () =>
  createIssueUrl(
    "[资源推荐] 工具名称",
    ["工具名称：", "官网链接：", "所属分类：", "推荐理由：", "适用场景：", "价格信息：", "替代工具："].join("\n"),
  );
