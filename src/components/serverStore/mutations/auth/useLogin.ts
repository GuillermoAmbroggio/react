import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import useWriting from '../../../../copywriting/useWriting';
import { IAuth, ILogin } from '../../../../types/user.types';
import { handleErrorReponse } from '../../../../utils';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';
import useGetUser from '../../queries/user/useGetUser';

type IPostLogin = ({ email, password }: ILogin) => Promise<IAuth>;

const postLogin: IPostLogin = async ({ email, password }) => {
  const response = await axiosFetch('/auth/login', {
    method: 'POST',
    data: { email, password },
  });
  return response;
};

const useLogin: () => UseMutationResult<IAuth, any, ILogin, unknown> = () => {
  const { dispatch } = useClientStore();
  const serverStore = useQueryClient();
  const writing = useWriting();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: async (data) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          status: 'success',
          message: writing.user.login.successMessage,
        },
      });
      serverStore.invalidateQueries({ queryKey: ['trusted-user'] });
      dispatch({ type: 'AUTH', payload: data });
      const user = await useGetUser();
      dispatch({ type: 'SET_USER', payload: user });
    },
    onError: (e) => {
      const error = handleErrorReponse(e);
      let errorText: string | undefined = undefined;
      if (error == 7) {
        errorText = 'El correo o la contraseña son incorrectos';
      }
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: writing.user.login.errorMessage,
          description: errorText,
          status: 'error',
        },
      });
    },
  });
};

export default useLogin;
