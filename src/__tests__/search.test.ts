import { describe, expect, it } from "vitest";
import { filterResources, globalSearch } from "@/utils/search";

describe("search utilities", () => {
  it("filters resources by query and category", () => {
    const results = filterResources({
      query: "接口",
      category: "dev-tool",
      sort: "recommended",
    });

    expect(results.some((resource) => resource.id === "postman")).toBe(true);
    expect(results.every((resource) => resource.category === "dev-tool")).toBe(true);
  });

  it("returns command results from global search", () => {
    const results = globalSearch("反馈");

    expect(results[0]).toMatchObject({
      type: "command",
      title: "反馈问题",
    });
  });

  it("returns resource results from tags and use cases", () => {
    const results = globalSearch("AI 编程");

    expect(results.some((result) => result.type === "resource" && result.id === "cursor")).toBe(true);
  });
});
