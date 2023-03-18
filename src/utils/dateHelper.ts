export const getDateDiff = (date1: string, date2: string) => {
  // const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const a = new Date(date1);
  const b = new Date(date2);
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor(utc1 - utc2);
};
