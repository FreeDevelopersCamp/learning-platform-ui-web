import { format } from 'date-fns';

/**
 * Formats a date string into a user-friendly format.
 * - Shows "X minutes ago" for recent timestamps.
 * - Shows "Today at HH:mm" if today.
 * - Shows "Yesterday at HH:mm" if yesterday.
 * - Otherwise, shows "MMM dd, yyyy at HH:mm".
 */
export function formatNotificationDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    date.toDateString() ===
    new Date(now.setDate(now.getDate() - 1)).toDateString();

  if (isToday) {
    return `Today at ${format(date, 'HH:mm')}`;
  } else if (isYesterday) {
    return `Yesterday at ${format(date, 'HH:mm')}`;
  } else {
    return format(date, 'MMM dd, yyyy HH:mm'); // Example: Jan 31, 2025 18:56
  }
}
