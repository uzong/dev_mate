import { useLibraryStore } from "@/store/libraryStore";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export function Toast() {
  const toast = useLibraryStore((state) => state.toast);
  const clearToast = useLibraryStore((state) => state.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(clearToast, 1800);
    return () => window.clearTimeout(timer);
  }, [clearToast, toast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-lg">
      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      {toast}
    </div>
  );
}
