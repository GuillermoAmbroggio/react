import { useQuery } from '@tanstack/react-query';
import { StatusFixture } from '../../../../types/fixture.types';
import axiosFetch from '../../../../utils/axiosConfig/axiosFetch';

type Response = {
  id: number;
  name: string;
  status: StatusFixture;
}[];

type Params = { tournamentId?: number };

const getFixturesName = async (params: Params): Promise<Response> => {
  const { tournamentId } = params;
  const response: Response = await axiosFetch(
    `/fixture/name${tournamentId ? `?tournamentId=${tournamentId}` : ''}`,
  );
  return response;
};

export default function useGetFixturesName(params: Params) {
  return useQuery({
    queryKey: ['fixtures-name'],
    queryFn: () => getFixturesName(params),
    staleTime: Infinity, // controla cuánto tiempo pueden permanecer los datos en caché antes de que se consideren obsoletos y se necesite una nueva actualización.
  });
}
