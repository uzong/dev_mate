import { Badge } from "@/components/ui/Badge";
import { ResourceCard } from "@/components/ResourceCard";
import { categories } from "@/data/categories";
import { rankings } from "@/data/rankings";
import { resources } from "@/data/resources";
import { topics } from "@/data/topics";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const featured = resources.filter((resource) => resource.featured).slice(0, 6);
  const topRanking = rankings[0];

  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb55,transparent_32%),radial-gradient(circle_at_top_right,#12b98144,transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <Badge tone="dark">舒适开发者工具库</Badge>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              找到真正好用的开发资源、插件和工具。
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              DevMate 把开发工具、效率插件、实用网站、学习资源、AI 工具和产品设计资源整理成一个轻松可搜索的工具库。
            </p>
            <Link
              to="/resources"
              className="mt-8 flex max-w-2xl items-center justify-between rounded-3xl border border-slate-700 bg-white p-3 text-left shadow-2xl shadow-blue-950/30 transition hover:border-blue-300"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Search className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-950">搜索工具、插件、网站或资源</span>
                  <span className="text-sm text-slate-500">也可以按分类、标签、价格和平台筛选</span>
                </span>
              </span>
              <span className="hidden rounded-xl border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 sm:inline-flex">
                ⌘ K
              </span>
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              {["AI 编程", "接口调试", "前端工具", "学习路线"].map((tag) => (
                <Link
                  key={tag}
                  to={`/resources?query=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:border-blue-300 hover:text-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = resources.filter((resource) => resource.category === category.id).length;
            return (
              <Link
                key={category.id}
                to={`/resources?category=${category.id}`}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-950">{category.name}</h2>
                  <Badge tone="blue">{count} 个</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <SectionHeader title="编辑精选" description="适合作为首批收藏的高价值资源。" to="/resources?featured=true" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} compact />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader title="场景专题" description="按真实开发场景组织资源组合。" to="/topics" compact />
          <div className="grid gap-3">
            {topics.slice(0, 4).map((topic) => (
              <Link key={topic.id} to={`/topics/${topic.id}`} className="rounded-2xl bg-slate-50 p-4 transition hover:bg-blue-50">
                <h3 className="font-semibold text-slate-950">{topic.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{topic.summary}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader title={topRanking.title} description={topRanking.description} to="/rankings" compact />
          <div className="space-y-3">
            {topRanking.resourceIds.slice(0, 6).map((id, index) => {
              const resource = resources.find((item) => item.id === id);
              if (!resource) return null;
              return (
                <Link key={resource.id} to={`/resources/${resource.id}`} className="flex items-center gap-3 rounded-2xl p-3 hover:bg-slate-50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-950">{resource.name}</span>
                    <span className="text-xs text-slate-500">{resource.tagline}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, description, to, compact = false }: { title: string; description: string; to: string; compact?: boolean }) {
  return (
    <div className={`mb-5 flex items-end justify-between gap-4 ${compact ? "" : "sm:mb-6"}`}>
      <div>
        <div className="flex items-center gap-2 text-blue-600">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]">精选</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <Link to={to} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-600">
        查看更多
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
