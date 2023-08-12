// Core
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

// Store
import { selectCurrentTheme } from '../../../store/selectors/settings';

export const useLogout = () => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const currentTheme = useSelector(selectCurrentTheme);
  
  const mutation = useMutation({
    mutationKey: ['profile'],
    mutationFn:  () => {
      return axios.post('/api/v1/logout');
    },
    onSuccess: async () => {
      push('/login');
    },
    onError (error: AxiosError<{ error: { code: number, message: string } }>) {
      toast.error(t(`errors:${error?.response?.data?.error?.code}`), {
        theme: currentTheme
      });
    }
  });

  return {
    doLogout: mutation.mutate
  };
};
