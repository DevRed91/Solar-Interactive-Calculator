'use client';

import { usePathname, useRouter } from 'next/navigation';

const getLocaleFromPath = (path: string): string => {
  const segments = path.split('/');
  return segments[1] || 'en'; // fallback if locale missing
};

const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = getLocaleFromPath(pathname);

  const push = (path: string) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const fullPath = `/${currentLocale}${normalizedPath}`;
    router.push(fullPath);
  };

  return { push };
};

export default useCustomRouter;
