import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';
import { SupportForm } from '../../../screens/support/components/supportForm/SupportForm';

type IPostEmail = (body: SupportForm) => Promise<string>;
const postEmail: IPostEmail = async (body) => {
  const response = await axiosFetch('/email/support', {
    method: 'POST',
    data: body,
  });
  return response;
};

const useSupportMessage: () => UseMutationResult<
  string,
  any,
  SupportForm,
  unknown
> = () => {
  const { dispatch } = useClientStore();
  return useMutation({
    mutationFn: postEmail,
    onSuccess: () => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          status: 'success',
          message: 'Mensaje enviado',
        },
      });
    },
    onError: () => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          status: 'error',
          message: 'Error al enviar el mensaje',
        },
      });
    },
  });
};

export default useSupportMessage;
