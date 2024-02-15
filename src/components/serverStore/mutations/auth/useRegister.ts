import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { IAuth, UserAttributes } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';
import useGetUser from '../../queries/user/useGetUser';
import useLogout from './useLogout';

type IPostRegister = (body: UserAttributes) => Promise<IAuth>;
const postRegister: IPostRegister = async (body) => {
  const data = await axiosFetch('/user/create-user', {
    method: 'POST',
    data: body,
  });
  return data;
};

const useRegister: () => UseMutationResult<
  IAuth,
  any,
  UserAttributes,
  unknown
> = () => {
  const { dispatch } = useClientStore();
  const { mutate } = useLogout();
  const serverStore = useQueryClient();
  return useMutation({
    mutationFn: postRegister,
    onSuccess: async (data) => {
      serverStore.invalidateQueries({ queryKey: ['trusted-user'] });
      if (!data) return mutate();
      dispatch({ type: 'AUTH', payload: data });
      const user = await useGetUser();
      dispatch({ type: 'SET_USER', payload: user });
    },
  });
};

export default useRegister;
