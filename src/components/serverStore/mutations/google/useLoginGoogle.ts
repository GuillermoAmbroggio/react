import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { IAuth } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';
import useGetUser from '../../queries/user/useGetUser';
import useLogout from '../auth/useLogout';

type IPostLoginGoogle = (body: { credential: string }) => Promise<IAuth>;
const postAuthGoogle: IPostLoginGoogle = async (body) => {
  const response = await axiosFetch('/auth/google', {
    method: 'POST',
    data: body,
  });
  return response;
};

const useLoginGoogle: () => UseMutationResult<
  IAuth,
  any,
  { credential: string },
  unknown
> = () => {
  const { dispatch } = useClientStore();
  const { mutate } = useLogout();
  const serverStore = useQueryClient();

  return useMutation({
    mutationFn: postAuthGoogle,
    onSuccess: async (data) => {
      if (!data) return mutate();
      dispatch({ type: 'AUTH', payload: data });
      const user = await useGetUser();
      dispatch({ type: 'SET_USER', payload: user });
      serverStore.invalidateQueries({ queryKey: ['trusted-user'] });
    },
    onError: () => {
      mutate();
    },
  });
};

export default useLoginGoogle;
