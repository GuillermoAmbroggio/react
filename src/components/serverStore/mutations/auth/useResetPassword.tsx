import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { IResetPassword } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type IPostResetPassword = ({
  confirmPassword,
  password,
}: IResetPassword) => Promise<string>;

const postResetPassword: IPostResetPassword = async (body) => {
  const { data }: { data: string } = await axiosFetch('/auth/reset-password', {
    method: 'POST',
    data: body,
  });
  return data;
};

const useResetPassword: () => UseMutationResult<
  string,
  any,
  IResetPassword,
  unknown
> = () => {
  return useMutation({ mutationFn: postResetPassword });
};

export default useResetPassword;
