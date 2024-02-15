import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ResponseTicketCreate } from '../../../../types/ticket.types';
import { decryptData } from '../../../../utils';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type IPostCreateTicket = (body: {
  ticket: string;
}) => Promise<ResponseTicketCreate>;
const postCreateTicket: IPostCreateTicket = async (body) => {
  const response = await axiosFetch('/ticket', {
    method: 'POST',
    data: body,
  });
  const decryptedTickets = decryptData(response);
  return decryptedTickets;
};

const useCreateTicket: () => UseMutationResult<
  ResponseTicketCreate,
  any,
  { ticket: string },
  unknown
> = () => {
  const serverStore = useQueryClient();

  return useMutation({
    mutationFn: postCreateTicket,
    onSuccess: () => {
      localStorage.removeItem('ticketResult');
      serverStore.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

export default useCreateTicket;
