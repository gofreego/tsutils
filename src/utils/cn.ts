/**
 * Merges class names together
 * Useful for conditional className composition
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
