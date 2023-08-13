// Core
import { GetServerSidePropsContext } from 'next';
import { getSelectorsByUserAgent } from 'react-device-detect';

// Store
import { setCurrentTheme, setIsMobile } from '../store/reducers/settings';
import { IStore } from '../store';
import { parseThemeFromCookie } from './parseThemeFromCookie';

export const initialDispatcher = (store: IStore, context: GetServerSidePropsContext) => {
  const userAgent = context.req.headers[ 'user-agent' ] || '';
  const { isMobile } = getSelectorsByUserAgent(userAgent);
  const theme = parseThemeFromCookie(context);

  store.dispatch(setCurrentTheme(theme));
  store.dispatch(setIsMobile(isMobile));
};
