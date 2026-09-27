export function formatFrenchDate(date: string) {
  const [day, month, year] = date.split('-').map(Number);
  if (!day || !month || !year) return date;

  return new Intl.DateTimeFormat('fr-TN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

export function toDateTime(date: string) {
  const [day, month, year] = date.split('-');
  return day && month && year ? `${year}-${month}-${day}` : undefined;
}
