// Core
import { GetServerSidePropsContext } from 'next';
import { getSelectorsByUserAgent } from 'react-device-detect';

// Store
import { setIsMobile } from '../store/reducers/settings';
import { IStore } from '../store';

export const initialDispatcher = (store: IStore, context: GetServerSidePropsContext) => {
  const userAgent = context.req.headers[ 'user-agent' ] || '';
  const { isMobile } = getSelectorsByUserAgent(userAgent);

  store.dispatch(setIsMobile(isMobile));
};
