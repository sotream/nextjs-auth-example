// noinspection DuplicatedCode
// Core
import Head from 'next/head';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCookies, setCookie } from 'cookies-next';

// Views
import { useTranslation } from 'next-i18next';
import { BaseView } from '../../views/BaseView';

// Store
import { reduxWrapper } from '../../store';
import { setAccessToken, setRefreshToken } from '../../store/reducers/auth';

// Other
import { parseThemeFromCookie, getLocaleFromContext } from '../../helpers';
import { withAuth } from '../../guards/withAuth';

const About: NextPage<{ theme: string }> = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`ST: ${ t('titles:about') }`}</title>
      </Head>
      <BaseView theme = { theme }>
        <h1>About page</h1>
      </BaseView>
    </>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps(
  (store) => (context) => {
    const locale = getLocaleFromContext(context);
    const theme = parseThemeFromCookie(context);

    const accessToken = '123456';
    const refreshToken = '7890123';

    setCookie('access_token', accessToken, { req: context.req, res: context.res, maxAge: 60 * 6 * 24, httpOnly: true });
    setCookie('refresh_token', refreshToken, { req: context.req, res: context.res, maxAge: 60 * 6 * 24, httpOnly: true });

    const cookies = getCookies(context);

    store.dispatch(setAccessToken(accessToken));
    store.dispatch(setRefreshToken(refreshToken));

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

export default About;
