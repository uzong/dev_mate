import { resources } from "@/data/resources";
import { useLibraryStore } from "@/store/libraryStore";
import { globalSearch } from "@/utils/search";
import { Command, ExternalLink, Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type GlobalSearchProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const resultTypeLabels = {
  resource: "资源",
  topic: "专题",
  category: "分类",
  command: "命令",
};

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const recentlyViewed = useLibraryStore((state) => state.recentlyViewed);
  const favoriteIds = useLibraryStore((state) => state.favorites);
  const results = useMemo(() => globalSearch(query), [query]);
  const recentResources = recentlyViewed
    .map((item) => resources.find((resource) => resource.id === item.id))
    .filter(Boolean)
    .slice(0, 4);
  const favoriteResources = resources.filter((resource) => favoriteIds.includes(resource.id)).slice(0, 4);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        onOpenChange(true);
      }
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  useEffect(() => {
    if (open) {
      setTimeout(() => document.getElementById("global-search-input")?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  const goTo = (target: string) => {
    navigate(target);
    onOpenChange(false);
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">
          <Search className="h-5 w-5 text-blue-300" />
          <input
            id="global-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索工具、插件、网站或输入 反馈 / 提交 / 收藏..."
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
          <kbd className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-400">Esc</kbd>
          <button
            type="button"
            aria-label="关闭搜索"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-3">
          {query ? (
            results.length ? (
              <div className="space-y-2">
                {results.map((result) => (
                  <button
                    type="button"
                    key={`${result.type}-${result.id}`}
                    onClick={() => goTo(result.target)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition hover:bg-slate-900"
                  >
                    <span>
                      <span className="text-sm font-semibold text-white">{result.title}</span>
                      <span className="ml-2 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                        {resultTypeLabels[result.type]}
                      </span>
                      <span className="mt-1 block text-sm text-slate-400">{result.description}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-slate-500" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-5 py-10 text-center">
                <p className="text-sm font-semibold text-white">暂时没有找到相关资源</p>
                <p className="mt-2 text-sm text-slate-400">可以换个关键词，或提交你想推荐的工具。</p>
                <Link
                  to="/submit"
                  onClick={() => onOpenChange(false)}
                  className="mt-5 inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  提交资源
                </Link>
              </div>
            )
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              <Panel title="快捷命令">
                {["提交资源", "反馈问题", "查看收藏", "查看榜单"].map((label) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() => {
                      setQuery(label.slice(0, 2));
                    }}
                    className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-slate-900"
                  >
                    <Command className="h-4 w-4 text-blue-300" />
                    {label}
                  </button>
                ))}
              </Panel>
              <Panel title="最近浏览">
                {recentResources.length ? (
                  recentResources.map((resource) => (
                    <button
                      type="button"
                      key={resource!.id}
                      onClick={() => goTo(`/resources/${resource!.id}`)}
                      className="block w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-slate-900"
                    >
                      {resource!.name}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-slate-500">还没有最近浏览记录。</p>
                )}
              </Panel>
              <Panel title="我的收藏">
                {favoriteResources.length ? (
                  favoriteResources.map((resource) => (
                    <button
                      type="button"
                      key={resource.id}
                      onClick={() => goTo(`/resources/${resource.id}`)}
                      className="block w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-slate-900"
                    >
                      {resource.name}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-slate-500">收藏后会显示在这里。</p>
                )}
              </Panel>
              <Panel title="热门搜索">
                {["AI 编程", "接口调试", "前端工具", "学习路线"].map((term) => (
                  <button
                    type="button"
                    key={term}
                    onClick={() => setQuery(term)}
                    className="mr-2 mt-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
                  >
                    {term}
                  </button>
                ))}
              </Panel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
      <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</h3>
      {children}
    </section>
  );
}
