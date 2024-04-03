import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractKey = (url: string): string => {
  const parts = url.split('/');
  const key = parts[parts.length - 1];
  return key.split('.')[0];
};
