import { GlobalSearch } from "@/components/GlobalSearch";
import { Toast } from "@/components/Toast";
import { createFeedbackIssueUrl } from "@/utils/feedback";
import { Code2, Menu, Search, Sparkles, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "首页", to: "/" },
  { label: "资源", to: "/resources" },
  { label: "专题", to: "/topics" },
  { label: "榜单", to: "/rankings" },
  { label: "收藏", to: "/favorites" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#F6F8FB]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-semibold tracking-tight text-slate-950">DevMate</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:bg-white hover:text-slate-950"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-auto hidden min-w-[260px] items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm transition hover:border-blue-200 hover:text-slate-800 md:flex"
          >
            <span className="inline-flex items-center gap-2">
              <Search className="h-4 w-4" />
              搜索工具、插件、网站...
            </span>
            <kbd className="rounded-lg border border-slate-200 px-2 py-0.5 text-xs">⌘ K</kbd>
          </button>

          <Link
            to="/submit"
            className="hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 lg:inline-flex"
          >
            提交资源
          </Link>
          <a
            href={createFeedbackIssueUrl("other")}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 lg:inline-flex"
          >
            反馈问题
          </a>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 md:hidden"
            aria-label="打开搜索"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 md:hidden"
            aria-label="打开菜单"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>DevMate 是一个轻松舒适的开发者资源与插件推荐网站。</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/submit" className="font-medium text-slate-700 hover:text-blue-700">
              提交资源
            </Link>
            <a href={createFeedbackIssueUrl("other")} target="_blank" rel="noreferrer" className="font-medium text-slate-700 hover:text-blue-700">
              反馈问题
            </a>
            <a href="https://github.com/uzong/dev_mate" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-blue-700">
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <Toast />
    </div>
  );
}
