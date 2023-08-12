// Core
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import clsx from 'classnames';

// Hooks
import { useSignUpForm } from './hooks/useSignUpForm';

// Styles
import Styles from './styles/index.module.scss';

export const SignUp: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    onFormSubmit,
    isLoading,
    errors
  } = useSignUpForm();

  return (
    <section className={Styles.container}>
      <header className={Styles.formHeader}>
        <h1>{t('forms:signUpFormTitle')}</h1>
      </header>
      <form onSubmit={onFormSubmit} className={Styles.signUpForm}>
        <div className={Styles.twoColumns}>
          <div className={Styles.formGroup}>
            { errors?.firstName?.message && <Tooltip id="signUp_firstName_tooltip" /> }
            <input
              data-tooltip-id="signUp_firstName_tooltip"
              data-tooltip-content={errors?.firstName?.message}
              data-tooltip-place="top-end"
              className={clsx(Styles.formInput, { [ Styles.error ]: errors?.firstName })}
              id='signUp_firstName'
              placeholder={t('forms:firstName')}
              autoComplete='off'
              {...register('firstName')}
            />
            <label
              className={Styles.formLabel}
              htmlFor='signUp_firstName'
            >
              {t('forms:firstName')}
            </label>
          </div>
          <div className={Styles.formGroup}>
            { errors?.lastName?.message && <Tooltip id="signUp_lastName_tooltip" /> }
            <input
              data-tooltip-id="signUp_lastName_tooltip"
              data-tooltip-content={errors?.lastName?.message}
              data-tooltip-place="top-end"
              className={clsx(Styles.formInput, { [ Styles.error ]: errors?.lastName })}
              id='signUp_lastName'
              autoComplete='off'
              placeholder={t('forms:lastName')}
              {...register('lastName')}
            />
            <label
              className={Styles.formLabel}
              htmlFor='signUp_lastName'
            >
              {t('forms:lastName')}
            </label>
          </div>
        </div>
        <div className={Styles.twoColumns}>
          <div className={Styles.formGroup}>
            { errors?.username?.message && <Tooltip id="signUp_username_tooltip" /> }
            <input
              data-tooltip-id="signUp_username_tooltip"
              data-tooltip-content={errors?.username?.message}
              data-tooltip-place="top-end"
              className={clsx(Styles.formInput, { [ Styles.error ]: errors?.username })}
              id='signUp_username'
              placeholder={t('forms:username')}
              autoComplete='off'
              {...register('username')}
            />
            <label
              className={Styles.formLabel}
              htmlFor='signUp_username'
            >
              {t('forms:username')}
            </label>
          </div>
          <div className={Styles.formGroup}>
            { errors?.email?.message && <Tooltip id="signUp_email_tooltip" /> }
            <input
              data-tooltip-id="signUp_email_tooltip"
              data-tooltip-content={errors?.email?.message}
              data-tooltip-place="top-end"
              className={clsx(Styles.formInput, { [ Styles.error ]: errors?.email })}
              id='signUp_email'
              placeholder= {t('forms:email')}
              autoComplete='off'
              {...register('email')}
            />
            <label
              className={Styles.formLabel}
              htmlFor='signUp_email'
            >
              {t('forms:email')}
            </label>
          </div>
        </div>
        <div className={Styles.formGroup}>
          { errors?.password?.message && <Tooltip id="signUp_password_tooltip" /> }
          <input
            data-tooltip-id="signUp_password_tooltip"
            data-tooltip-content={errors?.password?.message}
            data-tooltip-place="top-end"
            className={clsx(Styles.formInput, { [ Styles.error ]: errors?.password })}
            id='signUp_password'
            type='password'
            placeholder={t('forms:password')}
            autoComplete='off'
            {...register('password')}
          />
          <label
            className={Styles.formLabel}
            htmlFor='signUp_password'
          >
            {t('forms:password')}
          </label>
        </div>
        <input
          className={Styles.submitBtn}
          type='submit'
          disabled={isLoading}
          value={t('forms:signUpBtnText')}
        />
        <p>
          <span>{t('forms:signUpLinkTitle')}</span>{' '}
          <Link href='/login'>
            {t('forms:loginLink')}
          </Link>
        </p>
      </form>
    </section>
  );
};
