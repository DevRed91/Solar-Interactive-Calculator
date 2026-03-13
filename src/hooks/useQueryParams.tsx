'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const setParams = useCallback(
    (params: string | Record<string, string>, value?: string) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (typeof params === 'string') {
        if (value === undefined) {
          newParams.delete(params);
        } else {
          newParams.set(params, value);
        }
      } else {
        Object.entries(params).forEach(([key, val]) => {
          if (val === undefined || val === null) {
            newParams.delete(key);
          } else {
            newParams.set(key, val);
          }
        });
      }

      router.push(`?${newParams.toString()}`);
    },
    [searchParams, router],
  );

  const removeParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  const getAllParams = useCallback(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const removeAllParams = useCallback(() => {
    router.push('');
  }, [router]);

  return {
    getParam,
    setParams,
    removeParam,
    getAllParams,
    removeAllParams,
  };
}
