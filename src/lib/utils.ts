import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CSSProperties } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTextStyle(color: string | undefined): CSSProperties {
  if (!color) return {};

  const isGradient = color.includes('gradient');

  if (isGradient) {
    return {
      backgroundImage: color,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
    };
  }

  return { color };
}
