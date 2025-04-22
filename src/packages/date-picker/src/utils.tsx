function formatIt(date: Date, form: string): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  if (form === 'YYYY') {
    return date.getFullYear() + '';
  }
  if (form === 'YYYY-MM-DD') {
    return dateStr;
  }
  if (form === 'YYYY-MM') {
    return dateStr.substring(0, 7);
  }
  if (form === 'HH:mm') {
    return timeStr;
  }
  return `${dateStr} ${timeStr}`;
}

export function formatFn(value: Date | number | string, format: string | ((arg) => string), mode: string): string {
  const formatsEnum = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm',
    datetime: 'YYYY-MM-DD HH:mm',
    year: 'YYYY',
    month: 'YYYY-MM'
  };
  if (typeof format === 'string') {
    if (typeof value === 'number' || typeof value === 'string') {
      return formatIt(new Date(value), format);
    } else {
      return formatIt(value, format);
    }
  } else if (typeof format === 'function') {
    return format(value);
  }
  if (typeof value === 'number' || typeof value === 'string') {
    return formatIt(new Date(value), formatsEnum[mode]);
  } else {
    return formatIt(value, formatsEnum[mode]);
  }
}
