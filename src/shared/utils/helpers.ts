export function formatDate(dateStr: string | undefined | null) {
  if (!dateStr) return 'N/A';
  try {
    return new Date(dateStr).toLocaleString();
  } catch (e) {
    return dateStr;
  }
}