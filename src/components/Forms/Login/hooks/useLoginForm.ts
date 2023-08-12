// Core
import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { selectCurrentTheme } from '../../../../store/selectors/settings';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

interface ILoginUser {
  email: string,
  password: string
}

export const useLoginForm = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector(selectCurrentTheme);
  const { replace } = useRouter();

  const validationSchema: Yup.ObjectSchema<ILoginUser> = Yup.object().shape({
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
    mutationFn:  (loginData: ILoginUser) => {
      return axios.post<ILoginUser, any>('/api/v1/login', loginData);
    },
    onSuccess: async () => {
      toast.success(t('forms:loginSuccess'), {
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

  const onFormSubmit = handleSubmit(async (data: ILoginUser) => {
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
