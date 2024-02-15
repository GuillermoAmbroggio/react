import { useQuery } from '@tanstack/react-query';
import { ResponsePaginatedFixtures } from '../../../../types/fixture.types';
import { GetPaginatedQueryParams } from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

const getFixtures = async (
  params: GetPaginatedQueryParams,
): Promise<ResponsePaginatedFixtures> => {
  const queryParams = new URLSearchParams(params);

  const response: ResponsePaginatedFixtures = await axiosFetch(
    `/fixture?${queryParams.toString()}`,
  );
  return response;
};

export default function useGetFixtures(params: GetPaginatedQueryParams) {
  return useQuery({
    queryKey: ['fixtures'],
    queryFn: () => getFixtures(params),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
  });
}
