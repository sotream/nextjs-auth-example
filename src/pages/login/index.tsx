// noinspection DuplicatedCode
// Core
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Views, Components
import { useTranslation } from 'next-i18next';
import { BaseView } from '../../views/BaseView';
import { Login } from '../../components/Forms/Login';

// Store
import { reduxWrapper } from '../../store';

// Other
import { parseThemeFromCookie, getLocaleFromContext } from '../../helpers';
import { initialDispatcher } from '../../helpers/initialDispatcher';

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

export const getServerSideProps: GetServerSideProps = reduxWrapper.getServerSideProps(
  (store) => async (context) => {
    const locale = getLocaleFromContext(context);
    const theme = parseThemeFromCookie(context);

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
