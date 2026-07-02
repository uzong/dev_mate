import { ResourceCard } from "@/components/ResourceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { resources } from "@/data/resources";
import { useLibraryStore } from "@/store/libraryStore";

export default function FavoritesPage() {
  const favoriteIds = useLibraryStore((state) => state.favorites);
  const recentlyViewed = useLibraryStore((state) => state.recentlyViewed);
  const clearRecentlyViewed = useLibraryStore((state) => state.clearRecentlyViewed);
  const favorites = resources.filter((resource) => favoriteIds.includes(resource.id));
  const recentResources = recentlyViewed
    .map((item) => resources.find((resource) => resource.id === item.id))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-700">Library</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">我的资源库</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          收藏和最近浏览存储在当前浏览器中，不需要登录，也不会上传到服务器。
        </p>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-950">收藏资源</h2>
          <span className="text-sm text-slate-500">{favorites.length} 个</span>
        </div>
        {favorites.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} compact />
            ))}
          </div>
        ) : (
          <EmptyState title="还没有收藏资源" description="在资源卡片或详情页点击收藏后，会显示在这里。" actionLabel="去资源库看看" actionTo="/resources" />
        )}
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-950">最近浏览</h2>
          {recentResources.length ? (
            <button type="button" onClick={clearRecentlyViewed} className="text-sm font-semibold text-slate-500 hover:text-blue-700">
              清空最近浏览
            </button>
          ) : null}
        </div>
        {recentResources.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recentResources.map((resource) => (
              <ResourceCard key={resource!.id} resource={resource!} compact />
            ))}
          </div>
        ) : (
          <EmptyState title="还没有最近浏览" description="打开资源详情页后，最近浏览会自动记录在这里。" actionLabel="浏览热门资源" actionTo="/resources" />
        )}
      </section>
    </div>
  );
}
