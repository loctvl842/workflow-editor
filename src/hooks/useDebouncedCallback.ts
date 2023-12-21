import { useCallback, useEffect, useState } from "react";

export function useDebouncedCallback(callback: (...args: any[]) => void, delay: number = 1000) {
  const [args, setArgs] = useState<any[] | null>(null);

  const debouncedCallback = useCallback((...args: any[]) => {
    setArgs(args);
  }, []);

  useEffect(() => {
    if (args === null) return;
    const timeoutId = setTimeout(() => {
      callback(...args);
      setArgs(args);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [args, callback, delay]);

  return debouncedCallback;
}
