import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = LucideIcons as unknown as Record<string, LucideIcon>;

export const getIcon = (name: string): LucideIcon => {
  try {
    // @ts-ignore
    const Icon = iconMap[name];
    if (Icon) return Icon;
    
    // Fallback if not found
    return LucideIcons.HelpCircle;
  } catch (e) {
    console.error(`Error loading icon ${name}:`, e);
    return LucideIcons.HelpCircle;
  }
};
