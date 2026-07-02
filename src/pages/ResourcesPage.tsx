import { ResourceCard } from "@/components/ResourceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { categories } from "@/data/categories";
import { getAllTags, filterResources } from "@/utils/search";
import type { ResourceCategory, ResourcePricing } from "@/types/resource";
import { Search, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const pricingOptions: { label: string; value: ResourcePricing | "all" }[] = [
  { label: "全部价格", value: "all" },
  { label: "免费", value: "free" },
  { label: "免费增值", value: "freemium" },
  { label: "付费", value: "paid" },
  { label: "开源", value: "open-source" },
];

const sortOptions = [
  { label: "推荐优先", value: "recommended" },
  { label: "最新收录", value: "newest" },
  { label: "热门优先", value: "popular" },
  { label: "评分最高", value: "rating" },
] as const;

export default function ResourcesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tags = useMemo(() => getAllTags(), []);
  const query = searchParams.get("query") ?? "";
  const category = (searchParams.get("category") as ResourceCategory | "all" | null) ?? "all";
  const pricing = (searchParams.get("pricing") as ResourcePricing | "all" | null) ?? "all";
  const tag = searchParams.get("tag") ?? "";
  const featured = searchParams.get("featured") === "true";
  const sort = (searchParams.get("sort") as "recommended" | "newest" | "popular" | "rating" | null) ?? "recommended";
  const results = filterResources({ query, category, pricing, tag, featured, sort });

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams({});

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">Resources</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">资源库</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            按分类、标签、价格和排序快速找到适合当前工作的工具、插件和网站。
          </p>
        </div>
        <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
          共找到 {results.length} 个资源
        </div>
      </div>

      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => updateParam("query", event.target.value)}
              placeholder="搜索名称、标签、推荐理由、适用场景..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-300 focus:bg-white"
            />
          </label>
          <select
            value={pricing}
            onChange={(event) => updateParam("pricing", event.target.value)}
            className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-300"
          >
            {pricingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => updateParam("sort", event.target.value)}
            className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-300"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <FilterButton active={category === "all"} onClick={() => updateParam("category", "all")}>
            全部分类
          </FilterButton>
          {categories.map((item) => (
            <FilterButton key={item.id} active={category === item.id} onClick={() => updateParam("category", item.id)}>
              {item.name}
            </FilterButton>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <FilterButton active={featured} onClick={() => updateParam("featured", featured ? "" : "true")}>
            <SlidersHorizontal className="h-3.5 w-3.5" />
            只看精选
          </FilterButton>
          {tags.slice(0, 18).map((item) => (
            <FilterButton key={item} active={tag === item} onClick={() => updateParam("tag", tag === item ? "" : item)}>
              {item}
            </FilterButton>
          ))}
          {(query || category !== "all" || pricing !== "all" || tag || featured) && (
            <button type="button" onClick={clearFilters} className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100">
              清空筛选
            </button>
          )}
        </div>
      </div>

      {results.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="暂时没有找到相关资源"
          description="换个关键词，或提交你希望收录的开发工具、插件、网站和学习资源。"
          actionLabel="提交资源"
          actionTo="/submit"
        />
      )}
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition ${
        active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
      }`}
    >
      {children}
    </button>
  );
}
