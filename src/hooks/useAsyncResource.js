import { useState, useEffect } from 'react';

/**
 * Generic async data hook.
 * Eliminates the isMounted + setLoading + setError boilerplate that was
 * duplicated across all KPI/chart/table hooks.
 *
 * @param {() => Promise<T>} fetcher - Function that returns the data Promise.
 *   IMPORTANT: declare this inline at call site or with stable identity;
 *   it is NOT in the dep array. The `deps` array drives refetching.
 * @param {any[]} deps - Dependencies that trigger a refetch.
 * @param {T} initial - Initial data value.
 * @returns {{ data: T, isLoading: boolean, error: Error | null, refetch: () => Promise<void> }}
 */
export function useAsyncResource(fetcher, deps, initial) {
  const [data, setData]           = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  const run = async (alive) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (alive.current) setData(result);
    } catch (err) {
      if (alive.current) setError(err);
    } finally {
      if (alive.current) setIsLoading(false);
    }
  };

  useEffect(() => {
    const alive = { current: true };
    // Triggering an async fetch from an effect is the intended pattern here;
    // the set-state-in-effect rule is a soft suggestion to use Suspense-style
    // data fetching, which is a much larger architectural change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    run(alive);
    return () => { alive.current = false; };
    // The deps array is variadic by design (it's the public contract of this hook).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const refetch = () => run({ current: true });

  return { data, isLoading, error, refetch };
}
