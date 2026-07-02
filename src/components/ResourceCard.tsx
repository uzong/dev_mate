import { Badge } from "@/components/ui/Badge";
import { categories } from "@/data/categories";
import { useLibraryStore } from "@/store/libraryStore";
import type { ResourceItem } from "@/types/resource";
import { createFeedbackIssueUrl } from "@/utils/feedback";
import { ExternalLink, Heart, MessageSquare, Star } from "lucide-react";
import { Link } from "react-router-dom";

type ResourceCardProps = {
  resource: ResourceItem;
  compact?: boolean;
};

const pricingLabels = {
  free: "免费",
  freemium: "免费增值",
  paid: "付费",
  "open-source": "开源",
};

export function ResourceCard({ resource, compact = false }: ResourceCardProps) {
  const favorites = useLibraryStore((state) => state.favorites);
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(resource.id);
  const category = categories.find((item) => item.id === resource.category);

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-950">{resource.name}</h3>
            {resource.featured ? <Badge tone="green">精选</Badge> : null}
          </div>
          <p className="mt-1 text-sm text-slate-500">{resource.tagline}</p>
        </div>
        <button
          type="button"
          aria-label={isFavorite ? "取消收藏" : "收藏资源"}
          onClick={() => toggleFavorite(resource.id)}
          className="rounded-full border border-slate-200 p-2 text-slate-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Heart className={isFavorite ? "h-4 w-4 fill-rose-500 text-rose-500" : "h-4 w-4"} />
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{resource.recommendedReason}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {category ? <Badge tone="blue">{category.name}</Badge> : null}
        <Badge>{pricingLabels[resource.pricing]}</Badge>
        {!compact && resource.tags.slice(0, 3).map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {resource.rating.toFixed(1)}
        </span>
        <span>{resource.platforms.join(" / ")}</span>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        <Link
          to={`/resources/${resource.id}`}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          查看详情
        </Link>
        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          官网
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <a
          href={createFeedbackIssueUrl("broken-link", resource)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          反馈
        </a>
      </div>
    </article>
  );
}
