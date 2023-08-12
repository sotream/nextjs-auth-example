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

interface ILoginUser {
  email: string,
  password: string
}

export const useLoginForm = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector(selectCurrentTheme);

  const validationSchema: Yup.ObjectSchema<ILoginUser> = Yup.object().shape({
    email: Yup.string().email(t('forms:emailValidation'))
      .required(t('forms:emailValidationRequired')),
    password: Yup.string()
      .required(t('forms:passwordValidationRequired'))
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
    onSuccess: async ({ data }) => {
      // eslint-disable-next-line no-console
      console.log('user profile:', data);
    },
    onError (error: AxiosError<{ error: { code: number, message: string } }>) {
      // eslint-disable-next-line no-console
      console.log('login error:', error?.response?.data?.error);

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
