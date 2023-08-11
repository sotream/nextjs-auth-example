// Core
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

// Store
import { reduxWrapper } from '../store';

// Styles
import '../theme/styles.scss';

// Other
import nextI18NextConfig from '../../next-i18next.config';
// import { verifyBrowser } from '../helpers';

// const isBrowser = verifyBrowser();

NProgress.configure({ showSpinner: false });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Router.events.on('routeChangeStart', (_url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = reduxWrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <Head>
        <title>Sotream</title>
      </Head>
      <Component { ...pageProps } />
    </Provider>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
