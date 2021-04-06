import _typeof from "@babel/runtime/helpers/typeof";

function formatIt(date, form) {
  var pad = function pad(n) {
    return n < 10 ? "0".concat(n) : n;
  };

  var dateStr = "".concat(date.getFullYear(), "-").concat(pad(date.getMonth() + 1), "-").concat(pad(date.getDate()));
  var timeStr = "".concat(pad(date.getHours()), ":").concat(pad(date.getMinutes()));

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

  return "".concat(dateStr, " ").concat(timeStr);
}

export function formatFn(instance, value) {
  var formatsEnum = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm',
    datetime: 'YYYY-MM-DD HH:mm',
    year: 'YYYY',
    month: 'YYYY-MM'
  };
  var format = instance.$props.format;

  var type = _typeof(format);

  if (type === 'string') {
    if (typeof value === 'number') {
      return formatIt(new Date(value), format);
    } else {
      return formatIt(value, format);
    }
  }

  if (type === 'function') {
    return format(value);
  }

  if (typeof value === 'number') {
    return formatIt(new Date(value), formatsEnum[instance.$props.mode]);
  } else {
    return formatIt(value, formatsEnum[instance.$props.mode]);
  }
}