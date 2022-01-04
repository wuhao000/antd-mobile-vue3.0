export const mergeProps = <T>(props: T, defaultProps: Partial<T>): Partial<T> => {
  const newProps: Partial<T> = {
    ...defaultProps
  };
  Object.keys(props).forEach(key => {
    if (props[key] !== undefined) {
      newProps[key] = props[key];
    }
  });
  return newProps;
};
