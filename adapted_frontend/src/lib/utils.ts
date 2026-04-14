export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const formatPercent = (value: number): string => `${Math.round(value)}%`;
