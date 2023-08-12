// Core
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

// Store
import { reduxWrapper } from '../store';

// Styles
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
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
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }));
  const { store, props } = reduxWrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <Head>
        <title>Sotream</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={ pageProps.theme }
          />
          <Component { ...pageProps } />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
