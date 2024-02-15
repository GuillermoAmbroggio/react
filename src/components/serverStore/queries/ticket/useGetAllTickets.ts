import { useQuery } from '@tanstack/react-query';
import {
  ResponsePaginatedTickets,
  TicketQueryParams,
} from '../../../../types/ticket.types';
import { UserAttributes } from '../../../../types/user.types';
import { decryptData } from '../../../../utils';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

const getAllTickets = async (
  params: TicketQueryParams,
): Promise<ResponsePaginatedTickets> => {
  const queryParams = new URLSearchParams(params);

  const response: ResponsePaginatedTickets = await axiosFetch(
    `/ticket/all?${queryParams.toString()}`,
  );
  const decryptedUserTickets = response?.results.map((t) => ({
    ...t,
    user: t.user ? (decryptData(t.user) as UserAttributes) : undefined,
  }));
  return { ...response, results: decryptedUserTickets };
};

export default function useGetAllTickets(params: TicketQueryParams) {
  return useQuery({
    queryKey: [`tickets-fixture${params.fixtureId || ''}`],
    queryFn: () => getAllTickets(params),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
    gcTime: 1000 * 60 * 60, // 60 minutes (in milliseconds)
  });
}
