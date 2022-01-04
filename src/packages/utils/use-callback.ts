export const useCallback = <P extends any[] = any[], V extends any = any>(fn: (...args: P) => Promise<V>, callbacks: Array<(...args: P) => Promise<V>>) => {
  return async (...args: P) => {
    const result = await fn(...args);
    callbacks.forEach(cb => {
      cb(...args);
    });
    return result;
  };
};
