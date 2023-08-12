// noinspection DuplicatedCode
// Core
import Head from 'next/head';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Views
import { useTranslation } from 'next-i18next';
import { BaseView } from '../../views/BaseView';

// Store
import { reduxWrapper } from '../../store';

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
