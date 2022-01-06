export const isNotNull = value => {
  return !isNull(value);
}

export const isNull = value => {
  return value === null || value === undefined;
}
