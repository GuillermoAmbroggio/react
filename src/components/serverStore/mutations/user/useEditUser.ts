import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { UserAttributes } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';

type PutEditUserProps = (params: UserAttributes) => Promise<UserAttributes>;

const putEditUser: PutEditUserProps = async (params) => {
  return await axiosFetch('/user/edit-data', {
    method: 'PUT',
    data: params,
  }).then((response) => {
    return response;
  });
};

const useEditUser: () => UseMutationResult<
  UserAttributes,
  any,
  UserAttributes,
  unknown
> = () => {
  const { dispatch } = useClientStore();
  return useMutation({
    mutationFn: putEditUser,
    onSuccess: async (userEdited) => {
      dispatch({ type: 'SET_USER', payload: userEdited });
    },
  });
};

export default useEditUser;
