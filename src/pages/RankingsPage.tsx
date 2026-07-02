import { Badge } from "@/components/ui/Badge";
import { rankings } from "@/data/rankings";
import { getResourcesByIds } from "@/utils/search";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function RankingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-700">Rankings</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">资源榜单</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          用榜单快速找到大家更常用、更适合收藏的资源。
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {rankings.map((ranking) => (
          <section key={ranking.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">{ranking.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{ranking.description}</p>
            <div className="mt-5 space-y-3">
              {getResourcesByIds(ranking.resourceIds).map((resource, index) => (
                <Link key={resource.id} to={`/resources/${resource.id}`} className="flex gap-3 rounded-2xl p-3 transition hover:bg-slate-50">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-950">{resource.name}</span>
                      {resource.featured ? <Badge tone="green">精选</Badge> : null}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm text-slate-500">{resource.recommendedReason}</span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {resource.rating.toFixed(1)} / 热度 {resource.popularity}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
