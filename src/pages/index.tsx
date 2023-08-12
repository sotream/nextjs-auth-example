// noinspection DuplicatedCode
// Core
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

// Views
import { BaseView } from '../views/BaseView';
import { Main } from '../components/Main';

// Other
import { parseThemeFromCookie, getLocaleFromContext } from '../helpers';
import { createLogger } from '../helpers/logger';

const log = createLogger('home');

const Home: NextPage<{ theme: string }> = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`ST: ${t('titles:main')}`}</title>
      </Head>
      <BaseView theme = { theme }>
        <div>
          <Link
            style={{ color: '#000' }}
            href='/login'
          >
            { t('titles:login') }
          </Link>
          {' '}
          <Link
            style={{ color: '#000' }}
            href='/signup'
          >
            { t('titles:signUp') }
          </Link>
        </div>
        <Main />
      </BaseView>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = getLocaleFromContext(context);
  const theme = parseThemeFromCookie(context);

  log.info('Main page');

  return {
    props: {
      theme,
      ...await serverSideTranslations(locale, ['common', 'titles', 'nav-menu', 'forms']),
    }
  };
};

export default Home;
