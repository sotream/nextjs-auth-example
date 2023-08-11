// noinspection DuplicatedCode
// Core
import { getCookies } from 'cookies-next';

// Other
import { GetServerSidePropsContext } from 'next';
import { Themes } from '../common/enums/themes';

type ParseThemeFromCookieType = (context: GetServerSidePropsContext) => Themes;

export const parseThemeFromCookie: ParseThemeFromCookieType = (context) => {
  const { theme = Themes.LIGHT } = getCookies(context);

  if (theme !== Themes.LIGHT && theme !== Themes.DARK) {
    throw new Error(`theme should be one of ${Themes.LIGHT} or ${Themes.DARK}`);
  }

  return theme;
};
