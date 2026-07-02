import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "blue" | "green" | "gray" | "dark";
  className?: string;
};

export function Badge({ children, tone = "gray", className }: BadgeProps) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    gray: "bg-slate-100 text-slate-600 ring-slate-200",
    dark: "bg-slate-900 text-white ring-slate-700",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1", tones[tone], className)}>
      {children}
    </span>
  );
}
