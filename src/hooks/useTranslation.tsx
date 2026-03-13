'use client';
import { SUPPORTED_LOCALES } from '@/data/constants';
import { LangType } from '@/lib/types';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import en from '../dictionaries/en.json';
import hi from '../dictionaries/hi.json';
import mr from '../dictionaries/mr.json';

const useTranslation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useMemo(
    () => pathname.split('/')[1] as LangType,
    [pathname],
  );

  const handleLocaleChange = (value: LangType) => {
    const pathParts = pathname.split('/');
    const maybeLocale = pathParts[1] as LangType;

    const localeValues = SUPPORTED_LOCALES?.map((language) => language.value);

    // Remove the current locale from the path if it exists
    if (localeValues.includes(maybeLocale)) {
      pathParts.splice(1, 1);
    }

    const newPath = `/${value}${
      pathParts.join('/') === '' ? '/' : pathParts.join('/')
    }`;
    router.push(newPath);
  };

  const dictionary = useMemo(() => {
    const dictionaries = {
      en: () => en,
      hi: () => hi,
      mr: () => mr,
    };
    return dictionaries[currentLocale]();
  }, [currentLocale]);

  return {
    currentLocale,
    handleLocaleChange,
    supportedLocals: SUPPORTED_LOCALES?.map((language) => ({
      ...language,
      label:
        dictionary['step-one']['language-dropdown'][
          language.label as keyof (typeof dictionary)['step-one']['language-dropdown']
        ],
    })),
    dictionary,
  };
};

export default useTranslation;
