// noinspection DuplicatedCode
// Core
import Head from 'next/head';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCookies, setCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import axios from 'axios';

// Views
import { BaseView } from '../../views/BaseView';
import { Main } from '../../components/Main';

// Store
import { reduxWrapper } from '../../store';
import { setAccessToken, setRefreshToken } from '../../store/reducers/auth';

// Other
import { parseThemeFromCookie, getLocaleFromContext, absoluteUrl } from '../../helpers';
import { withAuth } from '../../guards/withAuth';

const Transactions: NextPage<{ theme: string }> = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`ST: ${ t('titles:transactions') }`}</title>
      </Head>
      <BaseView theme = { theme }>
        <h1>Transactions page</h1>
        <Main />
      </BaseView>
    </>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps(
  (store) => async (context) => {
    const locale = getLocaleFromContext(context);
    const theme = parseThemeFromCookie(context);

    const accessToken = '123456';
    const refreshToken = '7890123';

    setCookie('access_token', accessToken, { req: context.req, res: context.res, maxAge: 60 * 6 * 24, httpOnly: true });
    setCookie('refresh_token', refreshToken, { req: context.req, res: context.res, maxAge: 60 * 6 * 24, httpOnly: true });

    const cookies = getCookies(context);

    store.dispatch(setAccessToken(accessToken));
    store.dispatch(setRefreshToken(refreshToken));

    const { origin } = absoluteUrl(context.req);
    const requestUrl = `${origin}/api/v1/users`;
    const { data } = await axios.get(requestUrl);

    // eslint-disable-next-line no-console
    console.log('users', data);

    // eslint-disable-next-line no-console
    console.log('cookies.access_token', cookies.access_token);
    // eslint-disable-next-line no-console
    console.log('cookies.refresh_token', cookies.refresh_token);

    return withAuth(store, context, async function () {
      return {
        props: {
          theme,
          ...await serverSideTranslations(locale, ['common', 'titles', 'nav-menu']),
        }
      };
    });
  }
);

export default Transactions;
