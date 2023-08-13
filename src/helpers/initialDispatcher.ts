// Core
import axios, { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getSelectorsByUserAgent } from 'react-device-detect';

// Store
import { setCurrentTheme, setIsMobile, setAppVersion } from '../store/reducers/settings';
import { IStore } from '../store';

// Other
import { parseThemeFromCookie } from './parseThemeFromCookie';
import { absoluteUrl } from './absoluteUrl';

export const initialDispatcher = async (store: IStore, context: GetServerSidePropsContext) => {
  const userAgent = context.req.headers[ 'user-agent' ] || '';
  const { isMobile } = getSelectorsByUserAgent(userAgent);
  const theme = parseThemeFromCookie(context);

  const { origin } = absoluteUrl(context.req);
  const requestUrl = `${origin}/api/version`;
  const { data } = await axios.get<any, AxiosResponse<{ version: string }>>(requestUrl);

  store.dispatch(setCurrentTheme(theme));
  store.dispatch(setAppVersion(data.version));
  store.dispatch(setIsMobile(isMobile));
};
