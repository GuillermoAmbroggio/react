import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ResponsePaginatedTickets,
  ResponseTicketCreate,
  TicketAttributes,
} from '../../../../types/ticket.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type Params = { body: TicketAttributes };
type PutEditTicketProps = (params: { body: TicketAttributes }) => Promise<any>;

const putEditTicket: PutEditTicketProps = async (params) => {
  return await axiosFetch('/ticket', {
    method: 'PUT',
    data: params.body,
  }).then((response) => {
    return response;
  });
};

const useEditTicket: () => UseMutationResult<
  ResponseTicketCreate,
  any,
  Params,
  unknown
> = () => {
  const serverStore = useQueryClient();
  return useMutation({
    mutationFn: putEditTicket,
    onSuccess: async (dataEdited) => {
      const dataCache = serverStore.getQueryData(['tickets']) as
        | ResponsePaginatedTickets
        | undefined;

      if (dataCache && dataCache.results.length) {
        const results = dataCache.results;
        const dataEditIndex = results.findIndex((r) => r.id === dataEdited?.id);
        if (dataEditIndex !== -1) {
          results[dataEditIndex] = dataEdited;
        }
        serverStore.setQueryData(['tickets'], { ...dataCache, results });
      }

      serverStore.invalidateQueries({
        queryKey: [`tickets-${dataEdited?.id ?? ''}`],
      });
    },
  });
};

export default useEditTicket;
