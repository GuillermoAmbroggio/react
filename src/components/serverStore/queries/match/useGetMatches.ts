import { useQuery } from '@tanstack/react-query';
import { ResponsePaginatedMatches } from '../../../../types/match.types';
import { GetPaginatedQueryParams } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

const getMatches = async (
  params: GetPaginatedQueryParams,
): Promise<ResponsePaginatedMatches> => {
  const queryParams = new URLSearchParams(params);

  const response: ResponsePaginatedMatches = await axiosFetch(
    `/match?${queryParams.toString()}`,
  );
  return response;
};

export default function useGetMatches(params: GetPaginatedQueryParams) {
  return useQuery({
    queryKey: ['matches'],
    queryFn: () => getMatches(params),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
    gcTime: 1000 * 60 * 60, // 60 minutes (in milliseconds)
  });
}
