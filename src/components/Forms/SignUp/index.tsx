// Core
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

// Hooks
import { useSignUpForm } from './hooks/useSignUpForm';

// Styles
import Styles from './styles/index.module.scss';

export const SignUp: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    onFormSubmit
  } = useSignUpForm();

  return (
    <section className={Styles.container}>
      <header className={Styles.formHeader}>
        <h1>{t('forms:signUpFormTitle')}</h1>
      </header>
      <form onSubmit={handleSubmit(onFormSubmit)} className={Styles.signUpForm}>
        <div className={Styles.twoColumns}>
          <div className={Styles.formGroup}>
            <input
              className={Styles.formInput}
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
            <input
              className={Styles.formInput}
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
            <input
              className={Styles.formInput}
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
            <input
              className={Styles.formInput}
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
          <input
            className={Styles.formInput}
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
          value={t('forms:signUpBtnText')}
        />
        <p>
          <span>Already have an account?</span>{' '}
          <Link href='/login'>
            {t('forms:loginLink')}
          </Link>
        </p>
      </form>
    </section>
  );
};
