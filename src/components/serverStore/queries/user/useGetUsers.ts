import { useQuery } from '@tanstack/react-query';
import {
  GetPaginatedQueryParams,
  ResponsePaginatedUsers,
} from '../../../../types/user.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

export const getUsers = async (
  params: GetPaginatedQueryParams,
): Promise<ResponsePaginatedUsers> => {
  const queryParams = new URLSearchParams(params);

  const response: ResponsePaginatedUsers = await axiosFetch(
    `/user/allusers?${queryParams.toString()}`,
  );
  return response;
};

export default function useGetUsers(params: GetPaginatedQueryParams) {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(params),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
  });
}
