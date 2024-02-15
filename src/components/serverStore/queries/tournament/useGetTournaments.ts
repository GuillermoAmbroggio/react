import { useQuery } from '@tanstack/react-query';
import { ResponsePaginatedTournaments } from '../../../../types/tournament.types';
import { GetPaginatedQueryParams } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

const getTournaments = async (
  params: GetPaginatedQueryParams,
): Promise<ResponsePaginatedTournaments> => {
  const queryParams = new URLSearchParams(params);

  const response: ResponsePaginatedTournaments = await axiosFetch(
    `/tournament?${queryParams.toString()}`,
  );
  return response;
};

export default function useGetTournaments(params: GetPaginatedQueryParams) {
  return useQuery({
    queryKey: ['tournaments'],
    queryFn: () => getTournaments(params),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
  });
}
