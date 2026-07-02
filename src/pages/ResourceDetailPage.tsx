import { ResourceCard } from "@/components/ResourceCard";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { categories } from "@/data/categories";
import { resources } from "@/data/resources";
import { useLibraryStore } from "@/store/libraryStore";
import { createFeedbackIssueUrl } from "@/utils/feedback";
import { findResource } from "@/utils/search";
import { ExternalLink, Heart, MessageSquare, Star } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const pricingLabels = {
  free: "免费",
  freemium: "免费增值",
  paid: "付费",
  "open-source": "开源",
};

export default function ResourceDetailPage() {
  const { id } = useParams();
  const resource = findResource(id);
  const favorites = useLibraryStore((state) => state.favorites);
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);
  const addRecentlyViewed = useLibraryStore((state) => state.addRecentlyViewed);

  useEffect(() => {
    if (resource) addRecentlyViewed(resource.id);
  }, [addRecentlyViewed, resource]);

  if (!resource) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EmptyState title="资源不存在" description="这个资源可能还未收录，或链接已经发生变化。" actionLabel="返回资源库" actionTo="/resources" />
      </div>
    );
  }

  const category = categories.find((item) => item.id === resource.category);
  const isFavorite = favorites.includes(resource.id);
  const related = resources
    .filter((item) => item.category === resource.category && item.id !== resource.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/resources" className="text-sm font-semibold text-blue-700 hover:text-blue-600">
        返回资源库
      </Link>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {category ? <Badge tone="blue">{category.name}</Badge> : null}
              <Badge tone="green">{pricingLabels[resource.pricing]}</Badge>
              {resource.featured ? <Badge tone="green">编辑精选</Badge> : null}
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950">{resource.name}</h1>
            <p className="mt-3 text-lg text-slate-600">{resource.tagline}</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">{resource.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              访问官网
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => toggleFavorite(resource.id)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <Heart className={isFavorite ? "h-4 w-4 fill-rose-500 text-rose-500" : "h-4 w-4"} />
              {isFavorite ? "已收藏" : "收藏"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoCard title="推荐理由" value={resource.recommendedReason} />
          <InfoCard title="评分与热度" value={`${resource.rating.toFixed(1)} 分 / 热度 ${resource.popularity}`} icon={<Star className="h-4 w-4 fill-amber-400 text-amber-400" />} />
          <InfoCard title="支持平台" value={resource.platforms.join(" / ")} />
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">适用场景</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {resource.useCases.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-bold text-slate-950">标签</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <Link key={tag} to={`/resources?tag=${encodeURIComponent(tag)}`}>
                <Badge>{tag}</Badge>
              </Link>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-bold text-slate-950">替代方案</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {resource.alternatives.map((item) => (
              <Badge key={item} tone="gray">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">信息有误？反馈一下</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">首版通过 GitHub Issue 收集反馈，方便维护者审核后更新静态数据。</p>
          <div className="mt-4 grid gap-2">
            <FeedbackLink label="链接失效" type="broken-link" />
            <FeedbackLink label="信息错误" type="wrong-info" />
            <FeedbackLink label="资源不推荐" type="not-recommended" />
            <FeedbackLink label="其他建议" type="other" />
          </div>
        </aside>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">同类资源</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <ResourceCard key={item.id} resource={item} compact />
          ))}
        </div>
      </section>
    </div>
  );

  function FeedbackLink({ label, type }: { label: string; type: Parameters<typeof createFeedbackIssueUrl>[0] }) {
    return (
      <a
        href={createFeedbackIssueUrl(type, resource)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
      >
        <MessageSquare className="h-4 w-4" />
        {label}
      </a>
    );
  }
}

function InfoCard({ title, value, icon }: { title: string; value: string; icon?: ReactNode }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-700">
        {icon}
        {value}
      </p>
    </div>
  );
}
