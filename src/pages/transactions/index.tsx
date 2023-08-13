// noinspection DuplicatedCode
// Core
import Head from 'next/head';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// Views
import { BaseView } from '../../views/BaseView';

// Store
import { reduxWrapper } from '../../store';

// Other
import { parseThemeFromCookie, getLocaleFromContext } from '../../helpers';
import { withAuth } from '../../guards/withAuth';
import { initialDispatcher } from '../../helpers/initialDispatcher';

const Transactions: NextPage<{ theme: string }> = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`ST: ${ t('titles:transactions') }`}</title>
      </Head>
      <BaseView theme = { theme }>
        <h1>Transactions page</h1>
      </BaseView>
    </>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps(
  (store) => async (context) => {
    const locale = getLocaleFromContext(context);
    const theme = parseThemeFromCookie(context);

    await initialDispatcher(store, context);

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
