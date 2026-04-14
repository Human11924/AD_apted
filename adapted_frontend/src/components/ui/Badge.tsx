import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

interface Props {
  tone?: Tone;
  children: ReactNode;
}

const toneMap: Record<Tone, string> = {
  neutral: "bg-[#f0e6d8] text-[#5d4635]",
  success: "bg-[#e4f1df] text-[#2f6832]",
  warning: "bg-[#ffe9ba] text-[#7a5600]",
  danger: "bg-[#ffe0dd] text-[#9f2f24]",
  info: "bg-[#f7d772] text-[#4f3717]",
};

export function Badge({ tone = "neutral", children }: Props) {
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", toneMap[tone])}>{children}</span>;
}
