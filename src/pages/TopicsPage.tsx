import { Badge } from "@/components/ui/Badge";
import { topics } from "@/data/topics";
import { getResourcesByIds } from "@/utils/search";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-700">Topics</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">场景专题</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          按真实开发场景整理工具组合，适合快速建立一套可执行的工作流。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => {
          const topicResources = getResourcesByIds(topic.resourceIds);
          return (
            <Link
              key={topic.id}
              to={`/topics/${topic.id}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">{topic.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{topic.summary}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {topic.tags.map((tag) => (
                  <Badge key={tag} tone="blue">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="mt-5 text-sm text-slate-500">包含 {topicResources.length} 个资源</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
