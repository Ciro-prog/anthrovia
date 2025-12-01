import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = LucideIcons as unknown as Record<string, LucideIcon>;

export const getIcon = (name: string): LucideIcon => {
  // @ts-ignore
  return iconMap[name] || LucideIcons.Layers;
};
