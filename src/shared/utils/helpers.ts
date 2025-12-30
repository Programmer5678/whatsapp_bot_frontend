import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(dateStr: string | undefined | null) {
  if (!dateStr) return 'N/A';
  try {
    return new Date(dateStr).toLocaleString();
  } catch (e) {
    return dateStr;
  }
}