import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 *
 * This function combines clsx for conditional classes and tailwind-merge
 * for handling conflicting Tailwind classes by keeping only the last one.
 *
 * @param inputs - Class values that can be strings, objects, arrays, etc.
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * cn('text-red-500', 'text-blue-500') // Returns: 'text-blue-500'
 * cn('p-4', { 'p-8': true, 'p-2': false }) // Returns: 'p-8'
 * cn('bg-red-500', undefined, 'bg-blue-500') // Returns: 'bg-blue-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
