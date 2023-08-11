// noinspection DuplicatedCode
// Core
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Views
import { useTranslation } from 'next-i18next';
import { BaseView } from '../../views/BaseView';

// Components
import { Login } from '../../components/Forms/Login';

// Other
import { parseThemeFromCookie, getLocaleFromContext } from '../../helpers';
import { createLogger } from '../../helpers/logger';

const log = createLogger('home');

const Home: NextPage<{ theme: string }> = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`ST: ${t('titles:login')}`}</title>
      </Head>
      <BaseView theme = { theme }>
        <Login />
      </BaseView>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = getLocaleFromContext(context);
  const theme = parseThemeFromCookie(context);

  log.info('TEST');

  return {
    props: {
      theme,
      ...await serverSideTranslations(locale, ['common', 'titles', 'nav-menu', 'forms']),
    }
  };
};

export default Home;
