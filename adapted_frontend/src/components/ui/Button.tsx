import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
}

const variantMap: Record<Variant, string> = {
  primary: "bg-[var(--primary)] text-[#2f220e] hover:bg-[var(--primary-strong)] shadow-sm",
  secondary: "bg-transparent text-[var(--accent)] border border-[var(--primary)] hover:bg-[#fff1c9]",
  ghost: "bg-transparent text-[var(--muted)] hover:bg-[#f1e6d9]",
  danger: "bg-[var(--danger)] text-white hover:brightness-95",
};

const sizeMap: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button({
  className,
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus:outline-none focus-visible:ring",
        variantMap[variant],
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  );
}
