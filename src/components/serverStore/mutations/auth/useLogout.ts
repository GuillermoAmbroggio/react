import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useClientStore from '../../../clientStore/useClientStore';

type IPostLogout = () => Promise<string>;

const postLogout: IPostLogout = async () => {
  const { data }: { data: string } = await axios.get('/auth/logout', {
    withCredentials: true,
  });
  return data;
};

const useLogout = () => {
  const { dispatch } = useClientStore();
  const serverStore = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: async () => {
      dispatch({ type: 'LOGOUT' });
      serverStore.invalidateQueries({ queryKey: ['trusted-user'] });
    },
    onError: async () => {
      dispatch({ type: 'LOGOUT' });
    },
  });
};

export default useLogout;
