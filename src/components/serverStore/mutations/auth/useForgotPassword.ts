import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { IForgotPassword } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type IPostForgotassword = ({ email }: IForgotPassword) => Promise<string>;

const postForgotPassword: IPostForgotassword = async (body) => {
  const { data }: { data: string } = await axiosFetch('/auth/forgot-password', {
    method: 'POST',
    data: body,
  });
  return data;
};

const useForgotPassword: () => UseMutationResult<
  string,
  any,
  IForgotPassword,
  unknown
> = () => {
  return useMutation({ mutationFn: postForgotPassword });
};

export default useForgotPassword;
