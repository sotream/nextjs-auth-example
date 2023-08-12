// Core
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import clsx from 'classnames';
import { Tooltip } from 'react-tooltip';

// Hooks
import { useLoginForm } from './hooks/useLoginForm';

// Styles
import Styles from './styles/index.module.scss';

export const Login: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    onFormSubmit,
    isLoading,
    errors
  } = useLoginForm();

  return (
    <section className={Styles.container}>
      <header className={Styles.formHeader}>
        <h1>{t('forms:loginFormTitle')}</h1>
      </header>
      <form onSubmit={onFormSubmit} className={Styles.loginForm}>
        <div className={Styles.formGroup}>
          { errors?.email?.message && <Tooltip id="login_email_tooltip" /> }
          <input
            data-tooltip-id="login_email_tooltip"
            data-tooltip-content={errors?.email?.message}
            data-tooltip-place="top-end"
            className={clsx(Styles.formInput, { [ Styles.error ]: errors?.email })}
            id="login_email"
            autoComplete='off'
            placeholder={t('forms:email')}
            {...register('email')}
          />
          <label
            className={Styles.formLabel}
            htmlFor="login_email">
            {t('forms:email')}
          </label>
        </div>
        <div className={Styles.formGroup}>
          { errors?.password?.message && <Tooltip id="login_password_tooltip" /> }
          <input
            data-tooltip-id="login_password_tooltip"
            data-tooltip-content={errors?.password?.message || 'Unknown error'}
            data-tooltip-place="top-end"
            className={clsx(Styles.formInput, { [ Styles.error ]: errors?.password })}
            id="login_password"
            type="password"
            autoComplete='off'
            placeholder={t('forms:password')}
            {...register('password')}
          />
          <label
            className={Styles.formLabel}
            htmlFor="login_password">
            {t('forms:password')}
          </label>
        </div>
        <input
          className={Styles.submitBtn}
          type="submit"
          disabled={isLoading}
          value={t('forms:loginBtnText')}
        />
        <p>
          <span>{t('forms:loginLinkTitle')}</span>{' '}
          <Link href="/signup">
            {t('forms:signUpLink')}
          </Link>
        </p>
      </form>
    </section>
  );
};
