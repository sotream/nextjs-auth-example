// Core
import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

// Store
import { selectCurrentTheme } from '../../../../store/selectors/settings';

interface ICreateUser {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
}

export const useSignUpForm = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector(selectCurrentTheme);
  const { replace } = useRouter();

  const validationSchema: Yup.ObjectSchema<ICreateUser> = Yup.object().shape({
    firstName: Yup.string()
      .required(t('forms:firstNameValidationRequired')),
    lastName: Yup.string()
      .required(t('forms:lastNameValidationRequired')),
    username: Yup.string()
      .required(t('forms:usernameValidationRequired')),
    email: Yup.string().email(t('forms:emailValidation'))
      .required(t('forms:emailValidationRequired')),
    password: Yup.string()
      .required(t('forms:passwordValidationRequired'))
      .min(8, t('forms:passwordValidationMinLength'))
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const mutation = useMutation({
    mutationKey: ['profile'],
    mutationFn:  (data: ICreateUser) => {
      return axios.post<ICreateUser, any>('/api/v1/signup', data);
    },
    onSuccess: async () => {
      toast.success(t('forms:signUpSuccess'), {
        theme: currentTheme
      });

      replace('/transactions');
    },
    onError (error: AxiosError<{ error: { code: number, message: string } }>) {
      toast.error(t(`errors:${error?.response?.data?.error?.code}`), {
        theme: currentTheme
      });
    }
  });

  const onFormSubmit = handleSubmit(async (data: ICreateUser) => {
    mutation.mutate(data);

    reset();
  });
  
  return {
    register,
    onFormSubmit,
    errors,
    isLoading: mutation.isLoading
  };
};
