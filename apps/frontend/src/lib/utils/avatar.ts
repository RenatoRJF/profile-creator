/**
 * Generates initials from a full name for avatar display
 * @param name - Full name (e.g., "John Doe")
 * @returns Initials (e.g., "JD"), limited to 2 characters
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
