import { useQuery } from '@tanstack/react-query';
import { ResponsePaginatedTickets } from '../../../../types/ticket.types';
import { GetPaginatedQueryParams } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';
import useClientStore from '../../../clientStore/useClientStore';

const getTickets = async (
  params?: GetPaginatedQueryParams,
): Promise<ResponsePaginatedTickets> => {
  const queryParams = new URLSearchParams(params);

  const response: ResponsePaginatedTickets = await axiosFetch(
    `/ticket/?${queryParams.toString()}`,
  );
  return response;
};

export default function useGetTickets(params?: GetPaginatedQueryParams) {
  const { loggedUser } = useClientStore();

  return useQuery({
    queryKey: ['tickets-user'],
    queryFn: () => getTickets(params),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
    enabled: !!loggedUser,
  });
}
