// Core
import { useRouter } from 'next/router';

export const useChangeLocale = () => {
  const router = useRouter();
  const { locale, defaultLocale, pathname } = router;

  return {
    locale,
    defaultLocale,
    changeLocale: (lang: string) => async () => {
      await router.push(pathname, pathname, { locale: lang });
    },
  };
};
