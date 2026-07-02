import { ResourceCard } from "@/components/ResourceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { topics } from "@/data/topics";
import { getResourcesByIds } from "@/utils/search";
import { Link, useParams } from "react-router-dom";

export default function TopicDetailPage() {
  const { id } = useParams();
  const topic = topics.find((item) => item.id === id);

  if (!topic) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EmptyState title="专题不存在" description="这个专题可能还未创建，或链接已经发生变化。" actionLabel="返回专题" actionTo="/topics" />
      </div>
    );
  }

  const topicResources = getResourcesByIds(topic.resourceIds);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/topics" className="text-sm font-semibold text-blue-700 hover:text-blue-600">
        返回专题
      </Link>
      <section className="mt-6 rounded-[2rem] bg-slate-950 p-8 text-white">
        <p className="text-sm font-semibold text-blue-300">Topic</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight">{topic.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{topic.summary}</p>
      </section>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topicResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
