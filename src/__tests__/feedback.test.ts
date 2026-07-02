import { describe, expect, it } from "vitest";
import { resources } from "@/data/resources";
import { createFeedbackIssueUrl, createSubmitIssueUrl } from "@/utils/feedback";

describe("feedback utilities", () => {
  it("creates encoded resource feedback issue url", () => {
    const resource = resources.find((item) => item.id === "postman");
    const url = createFeedbackIssueUrl("broken-link", resource);
    const params = new URL(url).searchParams;

    expect(url).toContain("https://github.com/uzong/dev_mate/issues/new?");
    expect(params.get("title")).toBe("[资源反馈] Postman - 链接失效");
    expect(params.get("body")).toContain("资源名称：Postman");
  });

  it("creates submit resource issue url", () => {
    const url = createSubmitIssueUrl();
    const params = new URL(url).searchParams;

    expect(params.get("title")).toBe("[资源推荐] 工具名称");
    expect(params.get("body")).toContain("官网链接：");
  });
});
