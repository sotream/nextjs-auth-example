// Core
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

// Hooks
import { useLogin } from './hooks/useLogin';
import { selectProfileData } from '../../store/selectors/profile';

// Styles
import Styles from './styles/index.module.scss';

export const Main: FC = () => {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [login, { loading }] = useLogin();
  const { locale, defaultLocale } = useRouter();
  const { t } = useTranslation();
  const profile = useSelector(selectProfileData);

  return (
    <section className={Styles.container}>
      <header>
        <h1>{ t('common:greeting') } {t('common:guestName')}! :)</h1>
      </header>
      <div className={Styles.localesWrapper}>
        <p>{ t('common:currentLocale') }: <span>{ locale }</span></p>
        <p>{ t('common:defaultLocale') }: <span>{ defaultLocale }</span></p>
      </div>
      <div className={Styles.profileWrapper}>
        <p>{ profile.firstName } { profile.lastName }</p>
      </div>
    </section>
  );
};
