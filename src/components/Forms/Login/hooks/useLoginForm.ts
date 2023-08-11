import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface ILoginUser {
  email: string,
  password: string
}

export const useLoginForm = () => {
  const { t } = useTranslation();

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

  const onFormSubmit = async (data: ILoginUser) => {
    await axios.post('/api/v1/login', data);

    reset();
  };
  
  return {
    register,
    handleSubmit,
    onFormSubmit,
    errors
  };
};
