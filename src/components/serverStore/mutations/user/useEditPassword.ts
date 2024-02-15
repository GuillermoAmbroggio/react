import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { UserAttributes } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';

type Params = {
  password?: string;
  newPassword: string;
  confirmNewPassword: string;
};
type PutEditPasswordProps = (params: Params) => Promise<UserAttributes>;

const putEditPassword: PutEditPasswordProps = async (params) => {
  return await axiosFetch('/user/edit-password', {
    method: 'PUT',
    data: params,
  }).then((response) => {
    return response;
  });
};

const useEditPassword: () => UseMutationResult<
  UserAttributes,
  any,
  Params,
  unknown
> = () => {
  const { dispatch } = useClientStore();
  return useMutation({
    mutationFn: putEditPassword,
    onSuccess: async (userEdited) => {
      dispatch({ type: 'SET_USER', payload: userEdited });
    },
  });
};

export default useEditPassword;
