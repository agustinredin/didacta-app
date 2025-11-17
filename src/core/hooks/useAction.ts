import { useState, useCallback } from "react";

export function useAction(action) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(
    async (args) => {
      setLoading(true);
      setError(null);
      try {
        const res = await action(args);
        setData(res);
        return res;
      } catch (e) {
        setError(e);
        console.log(e);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [action]
  );

  return [
    loading as boolean,
    error as Error | null,
    data as any,
    execute as (args: any) => Promise<any>,
  ];
}
