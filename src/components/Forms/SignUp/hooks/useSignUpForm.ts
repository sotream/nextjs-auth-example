import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface ICreateUser {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
}

export const useSignUpForm = () => {
  const { t } = useTranslation();

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
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onFormSubmit = async (data: ICreateUser) => {
    await axios.post('/api/v1/signup', data);

    reset();
  };
  
  return {
    register,
    handleSubmit,
    onFormSubmit,
    errors
  };
};
