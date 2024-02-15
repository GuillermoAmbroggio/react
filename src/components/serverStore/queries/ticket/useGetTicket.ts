import { useQuery } from '@tanstack/react-query';
import { TicketAttributes } from '../../../../types/ticket.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

const getTicket = async (ticketId: number): Promise<TicketAttributes> => {
  const response: TicketAttributes = await axiosFetch(`/ticket/id/${ticketId}`);
  return response;
};

export default function useGetTicket(ticketId: number) {
  return useQuery({
    queryKey: [`ticket-${ticketId}`],
    queryFn: () => getTicket(ticketId),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
    gcTime: 1000 * 60 * 10, // 10 minutes (in milliseconds)
  });
}
