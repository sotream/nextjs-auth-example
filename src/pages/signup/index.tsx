// noinspection DuplicatedCode
// Core
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Views
import { useTranslation } from 'next-i18next';
import { BaseView } from '../../views/BaseView';

// Components
import { SignUp } from '../../components/Forms/SignUp';

// Other
import { parseThemeFromCookie, getLocaleFromContext } from '../../helpers';
import { createLogger } from '../../helpers/logger';
import { initialDispatcher } from '../../helpers/initialDispatcher';
import { reduxWrapper } from '../../store';

const log = createLogger('home');

const Home: NextPage<{ theme: string }> = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`ST: ${t('titles:signUp')}`}</title>
      </Head>
      <BaseView theme = { theme }>
        <SignUp />
      </BaseView>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = reduxWrapper.getServerSideProps(
  (store) => async (context) => {
    const locale = getLocaleFromContext(context);
    const theme = parseThemeFromCookie(context);

    log.info('SignUp getServerSideProps');

    initialDispatcher(store, context);

    return {
      props: {
        theme,
        ...await serverSideTranslations(locale, ['errors', 'common', 'titles', 'nav-menu', 'forms']),
      }
    };
  }
);

export default Home;
